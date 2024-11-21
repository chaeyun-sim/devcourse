import React, { ReactNode } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import styled from 'styled-components';

const Layout = ({ children }: {children: ReactNode}) => {
  return (
    <>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
    </>
  )
}

export default Layout;

const LayoutStyle = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 20px 0;

  @media screen AND (${({ theme }) => theme.mediaQuery.mobile}) {
    padding: 20px 12px;
  }
`