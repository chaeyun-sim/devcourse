import React, { useState } from 'react'
import { styled } from 'styled-components'
import logo from '@/assets/logo.png'
import { FaRegUser, FaSignInAlt, FaUserCircle, FaBars, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useCategory } from '@/hooks/useCategory'
import { useAuthStore } from '@/store/authStore'
import Dropdown from '../common/Dropdown'

const Header = () => {
  const { category } = useCategory()
  const { isLoggedIn, storeLogout } = useAuthStore()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <HeaderStyle isMobileOpen={isMobileOpen}>
      <h1 className="logo">
        <Link to={'/'}>
          <img src={logo} alt="book store" />
        </Link>
      </h1>
      <nav className="category">
        <button className="menu-button" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <FaAngleRight /> : <FaBars />}
        </button>

        <ul>
          {category.map((item) => (
            <li key={item.id}>
              <Link to={item.id === null ? '/books' : `/books?category_id=${item.id}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="auth">
        <Dropdown toggleButton={<FaUserCircle />}>
          {isLoggedIn ? (
            <ul>
              <li>
                <Link to="/cart">장바구니</Link>
              </li>
              <li>
                <Link to="/orderlist">주문 내역</Link>
              </li>
              <li>
                <button onClick={storeLogout}>로그아웃</button>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> 로그인
                </Link>
              </li>
              <li>
                <Link to="/siginup">
                  <FaRegUser /> 회원가입
                </Link>
              </li>
            </ul>
          )}
        </Dropdown>
      </nav>
    </HeaderStyle>
  )
}

export default Header

const HeaderStyle = styled.header<{ isMobileOpen: boolean }>`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  .logo {
    img {
      width: 200px;
    }
  }

  .category {
    .menu-button {
      display: none;
    }

    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
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
      flex-direction: column;
      gap: 16px;
      width: 100px;

      li {
        a,
        button {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          line-height: 1;
          background: none;
          border: 0;
          cursor: pointer;

          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }

  @media screen AND (${({ theme }) => theme.mediaQuery.mobile}) {
    height: 52px;

    .logo {
      padding: 0 0 0 12px;

      img {
        width: 140px;
      }
    }

    .auth {
      position: absolute;
      top: 12px;
      right: 12px;
    }

    .category {
      .menu-button {
        display: flex;
        position: absolute;
        top: 15px;
        right: ${({ isMobileOpen }) => (isMobileOpen ? '62%' : '52px')};
        background: #fff;
        border: none;
        font-size: 1.5rem;
      }

      ul {
        position: fixed;
        top: 0;
        right: ${({ isMobileOpen }) => (isMobileOpen ? '0' : '-100%')};
        width: 60%;
        height: 100vh;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: right 0.3s ease-in-out;

        margin: 0;
        padding: 24px;
        z-index: 1000;

        flex-direction: column;
        gap: 16px;
      }
    }
  }
`