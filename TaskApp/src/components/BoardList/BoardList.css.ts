import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/globalStyle.css';

export const container = style({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	flexWrap: 'wrap',
	rowGap: 15,
	minHeight: 'max-content',
	padding: vars.spacing.big2,
	backgroundColor: vars.color.main.dark,
})

export const title = style({
	color: vars.color.text.primary.bright,
	fontSize: vars.fontSize.T2,
	marginRight: vars.spacing.big1,
})

export const addButton = style({
	color: vars.color.text.primary.bright,
	fontSize: vars.fontSize.T2,
	cursor: 'pointer',
	marginLeft: vars.spacing.big1,
	height: '100%',
	":hover": {
		opacity: 0.8
	}
})

export const boardItem = style({
	color: vars.color.text.primary.bright,
	fontSize: vars.fontSize.T3,
	backgroundColor: vars.color.main.fade,
	padding: vars.spacing.medium,
	borderRadius: 10,
	cursor: 'pointer',
	marginRight: vars.spacing.big1,
	":hover": {
		opacity: 0.8,
		transform: 'scale(1.03)'
	}
})

export const boardItemActive = style({
	color: vars.color.text.primary.bright,
	fontSize: vars.fontSize.T3,
	backgroundColor: vars.color.selectedTab,
	padding: vars.spacing.medium,
	borderRadius: 10,
	cursor: 'pointer',
	marginRight: vars.spacing.big1
})

export const addSection = style({
	display: 'flex',
	alignItems: 'center',
	marginLeft: 'auto',
	height: '20px',
})

export const smallTitle = style({
	color: vars.color.text.primary.bright,
	fontSize: vars.fontSize.T3
})