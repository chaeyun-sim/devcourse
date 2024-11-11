import React from 'react';
import { styled } from 'styled-components';

const Header = () => {
	return (
    <HeaderStyle>
      <h1>헤더</h1>
    </HeaderStyle>
  )
};

export default Header;


const HeaderStyle = styled.header`
	background-color: #333;

	h1 {
		color: ${(props) => props.theme.color.primary};
	}
`