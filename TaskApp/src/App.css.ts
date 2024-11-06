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

export const deleteBoardButton = style({
  border: 'none',
  borderRadius: 5,
  width: 'max-content',
  marginTop: 'auto',
  marginLeft: 'auto',
  marginBottom: '30px',
  fontSize: vars.fontSize.T4,
  padding: vars.spacing.big2,
  backgroundColor: vars.color.main.fade,
  cursor: 'pointer',
  opacity: 0.6,
  minWidth: 150,
  ':hover': {
    opacity: 0.8,
  },
});

export const loggerButton = style({
  border: 'none',
  borderRadius: 5,
  width: 'max-content',
  marginTop: 'auto',
  marginLeft: '15px',
  marginRight: '30px',
  marginBottom: '30px',
  fontSize: vars.fontSize.T4,
  padding: vars.spacing.big2,
  backgroundColor: vars.color.main.fade,
  cursor: 'pointer',
  opacity: 0.6,
  minWidth: 150,
  ':hover': {
    opacity: 0.8,
  },
});
