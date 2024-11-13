import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react'
import styled from 'styled-components'

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const InputText = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
  return <InputStyle ref={ref} {...props} />
})

export default InputText

const InputStyle = styled.input.attrs({ type: 'text' })`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`
