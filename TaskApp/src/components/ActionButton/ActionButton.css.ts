import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/globalStyle.css';

export const taskButton = style({
	display: 'flex',
	alignItems: 'center',
	height: 'max-content',
	borderRadius: 4,
	marginTop: vars.spacing.small,
	fontSize: vars.fontSize.T3,
	padding: vars.spacing.medium,
	cursor: 'pointer',
	":hover": {
		backgroundColor: vars.color.text.secondary.darkHover
	}
})

export const listButton = style({
	display: 'flex',
	alignItems: 'center',
	height: 'max-content',
	borderRadius: 4,
	minWidth: vars.minWidth.list,
	marginTop: vars.spacing.small,
	color: vars.color.text.primary.bright,
	fontSize: vars.fontSize.T3,
	backgroundColor: vars.color.main.fade,
	padding: `${vars.spacing.small} ${vars.spacing.big2}`,
	cursor: 'pointer',
	":hover": {
		backgroundColor: vars.color.main.bright
	}
})