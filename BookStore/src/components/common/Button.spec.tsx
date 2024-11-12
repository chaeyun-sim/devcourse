import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from './Button'
import { BookStoreThemeProvider } from '@/context/themeContext'

describe('Button 컴포넌트 테스트', () => {
  it('렌더 확인', () => {
    // 렌더
    render(
      <BookStoreThemeProvider>
        <Button scheme="primary" size="large">
          버튼
        </Button>
      </BookStoreThemeProvider>
    )
    // 확인
    expect(screen.getByText('버튼')).toBeInTheDocument()
  })

  it('side props 적용', () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Button scheme="primary" size="large">
          버튼
        </Button>
      </BookStoreThemeProvider>
    )

    expect(container?.firstChild).toHaveStyle({ fontSize: '1.5rem' })
  })

  it('color props 적용', () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Button scheme='primary' size="large">버튼</Button>
      </BookStoreThemeProvider>
    )

    expect(container?.firstChild).toHaveStyle({ color: 'brown' })
  })
})
