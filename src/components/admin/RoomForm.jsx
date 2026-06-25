import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'

const schema = yup.object({
  nombre: yup.string().required('El nombre es obligatorio'),
  filas: yup
    .number()
    .typeError('Debe ser un número')
    .min(1, 'Mínimo 1 fila')
    .max(26, 'Máximo 26 filas (A-Z)')
    .required('Las filas son obligatorias'),
  columnas: yup
    .number()
    .typeError('Debe ser un número')
    .min(1, 'Mínimo 1 columna')
    .required('Las columnas son obligatorias'),
})

// sala: si viene con datos, el form entra en modo edición.
// En ese caso bloqueamos filas/columnas porque el backend NO regenera
// los asientos si se cambian después de creada la sala.
const RoomForm = ({ sala, onSubmit, enviando }) => {
  const esEdicion = !!sala

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (sala) {
      reset({
        nombre: sala.nombre,
        filas: sala.filas,
        columnas: sala.columnas,
      })
    }
  }, [sala, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-left">
      <Input
        label="Nombre de la sala"
        name="nombre"
        register={register}
        error={errors.nombre}
      />

      <Input
        label="Filas"
        name="filas"
        type="number"
        register={register}
        error={errors.filas}
        disabled={esEdicion}
      />

      <Input
        label="Columnas"
        name="columnas"
        type="number"
        register={register}
        error={errors.columnas}
        disabled={esEdicion}
      />

      {esEdicion && (
        <p className="text-xs mb-5" style={{ color: 'var(--ink-faint)' }}>
          Filas y columnas no se pueden editar: cambiarlas no regenera los asientos existentes.
        </p>
      )}

      <Button type="submit" disabled={enviando}>
        {enviando ? 'Guardando...' : sala ? 'Actualizar sala' : 'Crear sala'}
      </Button>
    </form>
  )
}

export default RoomForm
