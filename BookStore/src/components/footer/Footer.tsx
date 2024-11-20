import React from 'react';
import logo from '@/assets/logo.png'
import styled from 'styled-components';

const Footer = () => {
	return (
    <FooterStyle>
      <h1>
        <img src={logo} alt="book store" />
      </h1>
      <div>
        <p>copyright(c), 2024, Book Store.</p>
      </div>
    </FooterStyle>
  )
};

export default Footer;

const FooterStyle = styled.footer`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 20px 0;
  display: flex;
  justify-content: space-between;

  .logo img {
    width: 140px;
  }

  .copyright {
    p {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.color.text};
    }
  }
`