import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/globalStyle.css';

export const wrapper = style({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  zIndex: 1000000,
});

export const modalWindow = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '800px',
	height: 'max-content',
	maxHeight: '500px',
	overflowY: 'auto',
  borderRadius: '30px',
  padding: '20px',
  boxShadow: vars.shadow.basic,
  backgroundColor: vars.color.main.dark,
  opacity: 0.95,
  color: vars.color.text.primary.bright,
});

export const header = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '40px',
});

export const title = style({
  fontSize: vars.fontSize.T2,
  color: vars.color.text.primary.bright,
  marginRight: 'auto',
  marginBottom: vars.spacing.medium,
});

export const closeButton = style({
  fontSize: vars.fontSize.T2,
  cursor: 'pointer',
  marginTop: '-20px',
  ':hover': {
    opacity: 0.8,
  },
});

export const body = style({
  maxHeight: '400px',
  overflowY: 'auto',
  width: '100%',
});

