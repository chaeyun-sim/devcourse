import {style} from '@vanilla-extract/css'
import { vars } from './styles/globalStyle.css.ts'

export const appContainer = style({
	display: 'flex',
	flexDirection: 'column',
	minHeight: '100vh',
	height: 'max-content',
	width: '100vw'
})

export const board = style({
	display: 'flex',
	flexDirection: 'row',
	height: '100%',
})

export const buttons = style({
	marginTop: 'auto',
	paddingLeft: vars.spacing.big2
})