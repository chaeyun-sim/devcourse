import Button from '@/components/common/Button'
import InputText from '@/components/common/Input'
import Title from '@/components/common/Title'
import { useAlert } from '@/hooks/useAlert'
import { useAuth } from '@/hooks/useAuth'
import { useAuthStore } from '@/store/authStore'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export interface FormData {
  email: string
  password: string
}

const Login = () => {
  const { userLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  return (
    <>
      <Title size="large">로그인</Title>
      <LoginStyle>
        <form onSubmit={handleSubmit(userLogin)}>
          <fieldset>
            <InputText
              type="email"
              placeholder="이메일"
              {...register('email', {
                required: true
              })}
              inputMode="email"
            />
            {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
          </fieldset>
          <fieldset>
            <InputText
              type="password"
              placeholder="비밀번호"
              {...register('password', {
                required: true
              })}
              inputMode="text"
            />
            {errors.password && <p className="error-text">비밀번호 입력해주세요.</p>}
          </fieldset>
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              회원가입
            </Button>
          </fieldset>
          <div className="info">
            <Link to={'/reset'}>로그인</Link>
          </div>
        </form>
      </LoginStyle>
    </>
  )
}

export default Login

export const LoginStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: 0;
    padding: 0 0 8px 0;
    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }
`
