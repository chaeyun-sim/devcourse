import React from 'react';
import { styled } from 'styled-components';
import logo from '../../assets/logo.png';
import { FaRegUser, FaSignInAlt } from 'react-icons/fa'

const CATEGORY = [
	{
		id: null,
		name: '전체',
	},
	{
		id: 1,
		name: '동화'
	},
	{
		id: 2,
		name: '소설'
	},
	{
		id: 3,
		name: '사회'
	}
]

const Header = () => {
	return (
    <HeaderStyle>
      <h1 className="logo">
        <a href={'/'}>
          <img src={logo} alt="book store" />
        </a>
      </h1>
      <nav className="category">
        <ul>
          {CATEGORY.map((item) => (
            <li key={item.id}>
              <a href={item.id === null ? '/books' : `/books?category_id=${item.id}`}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="auth">
        <ul>
          <li>
            <a href="/login">
              <FaSignInAlt /> 로그인
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="/siginup"><FaRegUser /> 회원가입</a>
          </li>
        </ul>
      </nav>
    </HeaderStyle>
  )
};

export default Header;


const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  padding: 20px 0;

  .logo img {
    width: 200px;
    height: 200px;
  }

  .category {
    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 400;
          text-decoration: none;

          color: ${({ theme }) => theme.color.text};
          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      gap: 16px;
      li {
        font-size: 1rem;
        font-weight: 600;
        text-decoration: none;
        display: flex;
        align-items: center;
        line-height: 1;

        svg {
          margin-right: 4px;
        }
      }
    }
  }
`