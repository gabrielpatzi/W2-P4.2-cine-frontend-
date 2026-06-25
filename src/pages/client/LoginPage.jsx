import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Container from '../../components/common/Container'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

const schema = yup.object({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
})

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [errorServidor, setErrorServidor] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = (datos) => {
    setErrorServidor('')
    login(datos)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        const mensaje = error.response?.data?.message || 'Email o contraseña incorrectos'
        setErrorServidor(mensaje)
      })
  }

  return (
    <Container className="max-w-sm">
      <p className="font-mono text-xs tracking-[0.2em] mb-2" style={{ color: 'var(--ink-faint)' }}>BOLETERÍA</p>
      <h1 className="font-display text-3xl mb-8" style={{ color: 'var(--ink)' }}>Iniciar sesión</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
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
          Ingresar
        </Button>
      </form>

      <p className="mt-6 text-sm" style={{ color: 'var(--ink-faint)' }}>
        ¿No tenés cuenta?{' '}
        <Link to="/register" style={{ color: 'var(--accent)' }}>Registrate</Link>
      </p>
    </Container>
  )
}

export default LoginPage
