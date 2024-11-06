import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/globalStyle.css';

export const taskForm = style({
	display: 'flex',
	flexDirection: 'column',
	height: 'max-content',
	borderRadius: 4,
	marginTop: vars.spacing.small,
	fontSize: vars.fontSize.T3,
	padding: vars.spacing.medium
})

export const listForm = style({
  display: 'flex',
	flexDirection: 'column',
	marginRight: vars.spacing.listSpacing,
	width: 'max-content',
  height: 'max-content',
  borderRadius: 4,
	padding: vars.spacing.big2,
	backgroundColor: vars.color.list
});

export const input = style({
  padding: vars.spacing.medium,
  fontSize: vars.fontSize.P1,
  minHeight: 60,
  marginBottom: vars.spacing.medium,
  border: 'none',
  boxShadow: vars.shadow.basic,
  borderRadius: 4,
  resize: 'none',
  overflow: 'hidden',
  wordWrap: 'break-word',
  outline: 'none',
});

export const button = style({
	width: 150,
	color: vars.color.text.primary.bright,
	padding: vars.spacing.medium,
	fontSize: vars.fontSize.T3,
	backgroundColor: vars.color.main.dark,
	":hover": {
		backgroundColor: vars.color.main.fade,
	}
})

export const buttonGroup = style({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
})

export const close = style({
	marginLeft: vars.spacing.big2,
	fontSize: vars.fontSize.T1,
	opacity: 0.5,
	cursor: 'pointer',
	":hover": {
		opacity: 0.7
	}
})