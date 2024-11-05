import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/globalStyle.css';

export const sideForm = style({
	display: 'flex',
	alignItems: 'center',
	marginLeft: 'auto'
})

export const input = style({
  padding: `0 ${vars.spacing.small}`,
  fontSize: vars.fontSize.T4,
  minHeight: 30,
  outline: 'none',
  border: 0,
});

export const icon = style({
	color: vars.color.text.primary.bright,
	fontSize: vars.fontSize.T2,
	marginLeft: vars.spacing.medium,
	cursor: 'pointer',
	":hover": {
		opacity: 0.8
	}
})