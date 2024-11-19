import Button from '@/components/common/Button'
import InputText from '@/components/common/Input'
import Title from '@/components/common/Title'
import { useAuth } from '@/hooks/useAuth'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export interface FormData {
  email: string
  password: string
}

const ResetPassword = () => {
  const { resetRequested, userResetPassword, useResetRequest } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    resetRequested ? userResetPassword(data) : useResetRequest(data)
  }

  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              type="email"
              placeholder="이메일"
              {...register('email', {
                required: true
              })}
            />
            {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
          </fieldset>
          {resetRequested && (
            <fieldset>
              <InputText
                type="password"
                placeholder="비밀번호"
                {...register('password', {
                  required: true
                })}
              />
              {errors.password && <p className="error-text">비밀번호 입력해주세요.</p>}
            </fieldset>
          )}
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              {resetRequested ? '비밀번호 초기화' : '초기화 요청'}
            </Button>
          </fieldset>
          <div className="info">
            <Link to={'/reset'}>비밀번호 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  )
}

export default ResetPassword

export const SignupStyle = styled.div`
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
