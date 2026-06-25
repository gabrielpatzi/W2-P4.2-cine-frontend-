import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import { GENEROS, CLASIFICACIONES } from '../../utils/constants'

const schema = yup.object({
  titulo: yup.string().required('El título es obligatorio'),
  sinopsis: yup
    .string()
    .min(10, 'Mínimo 10 caracteres')
    .max(2000, 'Máximo 2000 caracteres')
    .required('La sinopsis es obligatoria'),
  genero: yup.string().required('Selecciona un género'),
  duracion: yup
    .number()
    .typeError('La duración debe ser un número')
    .positive('Debe ser mayor a 0')
    .required('La duración es obligatoria'),
  clasificacion: yup.string().required('Selecciona una clasificación'),
})

// pelicula: si viene con datos, el form entra en modo edición
const MovieForm = ({ pelicula, onSubmit, enviando }) => {
  const [poster, setPoster] = useState(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (pelicula) {
      reset({
        titulo: pelicula.titulo,
        sinopsis: pelicula.sinopsis,
        genero: pelicula.genero,
        duracion: pelicula.duracion,
        clasificacion: pelicula.clasificacion,
      })
    }
  }, [pelicula, reset])

  const submitForm = (datos) => {
    onSubmit({ ...datos, poster })
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className="text-left">
      <Input
        label="Título"
        name="titulo"
        register={register}
        error={errors.titulo}
      />

      <div className="flex flex-col mb-5">
        <label className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--ink-dim)]">Sinopsis</label>
        <textarea
          {...register('sinopsis')}
          rows={4}
          className="bg-[var(--surface-raised)] border border-[var(--line)] text-[var(--ink)] px-3 py-2.5 focus:outline-none focus:border-[var(--accent)]"
        />
        {errors.sinopsis && <span className="error">{errors.sinopsis.message}</span>}
      </div>

      <div className="flex flex-col mb-5">
        <label className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--ink-dim)]">Género</label>
        <select {...register('genero')} className="bg-[var(--surface-raised)] border border-[var(--line)] text-[var(--ink)] px-3 py-2.5">
          <option value="">Selecciona...</option>
          {GENEROS.map((g) => (
            <option key={g.value} value={g.value}>{g.label}</option>
          ))}
        </select>
        {errors.genero && <span className="error">{errors.genero.message}</span>}
      </div>

      <Input
        label="Duración (minutos)"
        name="duracion"
        type="number"
        register={register}
        error={errors.duracion}
      />

      <div className="flex flex-col mb-5">
        <label className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--ink-dim)]">Clasificación</label>
        <select {...register('clasificacion')} className="bg-[var(--surface-raised)] border border-[var(--line)] text-[var(--ink)] px-3 py-2.5">
          <option value="">Selecciona...</option>
          {CLASIFICACIONES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        {errors.clasificacion && <span className="error">{errors.clasificacion.message}</span>}
      </div>

      <div className="flex flex-col mb-5">
        <label className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--ink-dim)]">
          Poster {pelicula && '(dejar vacío para mantener el actual)'}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPoster(e.target.files?.[0] || null)}
          className="bg-[var(--surface-raised)] border border-[var(--line)] text-[var(--ink-dim)] text-sm px-3 py-2.5"
        />
      </div>

      <Button type="submit" disabled={enviando}>
        {enviando ? 'Guardando...' : pelicula ? 'Actualizar película' : 'Crear película'}
      </Button>
    </form>
  )
}

export default MovieForm
