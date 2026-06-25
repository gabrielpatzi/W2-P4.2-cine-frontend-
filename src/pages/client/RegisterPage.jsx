import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router'
import { useState } from 'react'
import authService from '../../services/authService'
import Container from '../../components/common/Container'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

// El backend exige: 8+ caracteres, mayúscula, minúscula, número y símbolo
const schema = yup.object({
  nombre: yup.string().required('El nombre es obligatorio'),
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .matches(/[A-Z]/, 'Debe tener al menos una mayúscula')
    .matches(/[a-z]/, 'Debe tener al menos una minúscula')
    .matches(/[0-9]/, 'Debe tener al menos un número')
    .matches(/[^A-Za-z0-9]/, 'Debe tener al menos un símbolo')
    .required('La contraseña es obligatoria'),
})

const RegisterPage = () => {
  const navigate = useNavigate()
  const [errorServidor, setErrorServidor] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = (datos) => {
    setErrorServidor('')
    authService.register(datos)
      .then(() => {
        navigate('/login')
      })
      .catch((error) => {
        const mensaje = error.response?.data?.message || 'No se pudo completar el registro'
        setErrorServidor(mensaje)
      })
  }

  return (
    <Container className="max-w-sm">
      <p className="font-mono text-xs tracking-[0.2em] mb-2" style={{ color: 'var(--ink-faint)' }}>BOLETERÍA</p>
      <h1 className="font-display text-3xl mb-8" style={{ color: 'var(--ink)' }}>Crear cuenta</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nombre"
          name="nombre"
          register={register}
          error={errors.nombre}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email}
        />
        <Input
          label="Contraseña"
          name="password"
          type="password"
          register={register}
          error={errors.password}
        />

        {errorServidor && <p className="error mb-3">{errorServidor}</p>}

        <Button type="submit" className="w-full">
          Registrarme
        </Button>
      </form>

      <p className="mt-6 text-sm" style={{ color: 'var(--ink-faint)' }}>
        ¿Ya tenés cuenta?{' '}
        <Link to="/login" style={{ color: 'var(--accent)' }}>Iniciá sesión</Link>
      </p>
    </Container>
  )
}

export default RegisterPage
