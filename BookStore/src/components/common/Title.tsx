import { ColorKey } from '@/styles/theme';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
	children: ReactNode;
	size: 'large' | 'medium' | 'small'
	color?: ColorKey;
}

const Title = ({ children, size, color }: Props) => {
  return (
    <TitleStyle size={size} color={color!}>
      {children}
    </TitleStyle>
  )
}

export default Title;

const TitleStyle = styled.h1<Omit<Props, 'children'>>`
  font-size: ${({ theme, size }) => theme.heading[size]};
  color: ${({ theme, color }) => color ? theme.color[color!] : theme.color.primary};
`