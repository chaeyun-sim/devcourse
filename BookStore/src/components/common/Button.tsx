import { ButtonScheme, Size } from '@/styles/theme'
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import styled from 'styled-components'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: Size
  scheme: ButtonScheme
  disabled?: boolean
  isLoading?: boolean
}

const Button = ({ children, ...props }: PropsWithChildren<Props>) => {
  return <ButtonStyle {...props}>{children}</ButtonStyle>
}

export default Button

const ButtonStyle = styled.div<Omit<Props, 'children'>>`
  font-size: ${({ theme, size }) => theme.button[size].fontSize};
  padding: ${({ theme, size }) => theme.button[size].padding};
  color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
  background-color: ${({ theme, scheme }) => theme.buttonScheme[scheme].backgroundColor};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`
