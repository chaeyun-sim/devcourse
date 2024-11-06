import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/globalStyle.css';

export const logItemWrap = style({
	display: 'flex',
	flexDirection: 'column',
	alignSelf: 'flex-start',
	padding: vars.spacing.medium,
	marginBottom: vars.spacing.big2,
	width: '100%',
	borderBottom: '1px solid rgb(191, 197, 217, 0.3)',
	":hover": {
		backgroundColor: vars.color.main.bright,
		borderRadius: 10,
	}
})

export const author = style({
	display: 'flex',
	alignItems: 'center',
	columnGap: 10,
	color: vars.color.text.primary.bright,
	fontSize: vars.fontSize.T3,
	fontWeight: 'bold',
	marginBottom: vars.spacing.medium,
})

export const message = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  color: vars.color.text.primary.bright,
  fontWeight: 'bold',
  fontSize: vars.fontSize.T4,
  marginBottom: vars.spacing.small,
});

export const date = style({
	fontSize: vars.fontSize.P1,
	marginBottom: vars.spacing.medium
})