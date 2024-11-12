import React, { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import InputText from './Input'
import { BookStoreThemeProvider } from '@/context/themeContext'

describe('InputText 컴포넌트 테스트', () => {
	it('렌더 확인', () => {
		// 렌더
		render(
			<BookStoreThemeProvider>
				<InputText placeholder="여기에 입력하세요" />
			</BookStoreThemeProvider>
		)
		// 확인
		expect(screen.getByPlaceholderText('여기에 입력하세요')).toBeInTheDocument()
	});

	it('forwardRef 테스트', () => {
		const ref = createRef<HTMLInputElement>();
		// 렌더
		render(
			<BookStoreThemeProvider>
				<InputText placeholder="여기에 입력하세요" ref={ref} />
			</BookStoreThemeProvider>
		)
		// 확인
		expect(ref.current).toBeInstanceOf(HTMLInputElement)
	});
})
