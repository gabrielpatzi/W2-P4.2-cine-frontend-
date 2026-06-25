import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import moment from 'moment'
import Input from '../common/Input'
import Button from '../common/Button'
import { toIsoDateTime } from '../../utils/dateHelpers'

const schema = yup.object({
  peliculaId: yup.string().required('Selecciona una película'),
  salaId: yup.string().required('Selecciona una sala'),
  precio: yup
    .number()
    .typeError('El precio debe ser un número')
    .positive('Debe ser mayor a 0')
    .required('El precio es obligatorio'),
  fecha: yup.string().required('La fecha es obligatoria'),
  hora: yup.string().required('La hora es obligatoria'),
})

// funcion: si viene con datos, el form entra en modo edición
const ShowtimeForm = ({ funcion, peliculas = [], salas = [], onSubmit, enviando }) => {
  const [errorServidor, setErrorServidor] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (funcion) {
      const momentoInicio = moment(funcion.fecha_hora_inicio)
      reset({
        peliculaId: funcion.peliculaId ?? funcion.pelicula?.id,
        salaId: funcion.salaId ?? funcion.sala?.id,
        precio: funcion.precio,
        fecha: momentoInicio.format('YYYY-MM-DD'),
        hora: momentoInicio.format('HH:mm'),
      })
    }
  }, [funcion, reset])

  const submitForm = (datos) => {
    setErrorServidor('')
    const payload = {
      peliculaId: datos.peliculaId,
      salaId: datos.salaId,
      precio: datos.precio,
      fecha_hora_inicio: toIsoDateTime(datos.fecha, datos.hora),
    }

    onSubmit(payload, setErrorServidor)
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className="text-left">
      <div className="flex flex-col mb-5">
        <label className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--ink-dim)]">Película</label>
        <select {...register('peliculaId')} className="bg-[var(--surface-raised)] border border-[var(--line)] text-[var(--ink)] px-3 py-2.5">
          <option value="">Selecciona...</option>
          {peliculas.map((p) => (
            <option key={p.id} value={p.id}>{p.titulo}</option>
          ))}
        </select>
        {errors.peliculaId && <span className="error">{errors.peliculaId.message}</span>}
      </div>

      <div className="flex flex-col mb-5">
        <label className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--ink-dim)]">Sala</label>
        <select {...register('salaId')} className="bg-[var(--surface-raised)] border border-[var(--line)] text-[var(--ink)] px-3 py-2.5">
          <option value="">Selecciona...</option>
          {salas.map((s) => (
            <option key={s.id} value={s.id}>{s.nombre}</option>
          ))}
        </select>
        {errors.salaId && <span className="error">{errors.salaId.message}</span>}
      </div>

      <Input
        label="Fecha"
        name="fecha"
        type="date"
        register={register}
        error={errors.fecha}
      />

      <Input
        label="Hora"
        name="hora"
        type="time"
        register={register}
        error={errors.hora}
      />

      <Input
        label="Precio (Bs.)"
        name="precio"
        type="number"
        register={register}
        error={errors.precio}
      />

      {/* El backend responde 409 si la sala ya tiene otra función superpuesta en ese horario */}
      {errorServidor && <p className="error mb-2">{errorServidor}</p>}

      <Button type="submit" disabled={enviando}>
        {enviando ? 'Guardando...' : funcion ? 'Actualizar función' : 'Crear función'}
      </Button>
    </form>
  )
}

export default ShowtimeForm
