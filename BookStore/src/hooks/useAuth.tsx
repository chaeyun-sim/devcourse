import { login, resetPassword, resetRequest, signup } from '@/api/auth.api';
import { useAuthStore } from '@/store/authStore'
import { useAlert } from './useAlert';
import { useNavigate } from 'react-router-dom';
import { FormData as LoginProps } from '@/pages/Login';
import {FormData as SignupProps} from '@/pages/Signup'
import { useState } from 'react';

export const useAuth = () => {
  const navigate = useNavigate()
  const { storeLogin, storeLogout, isLoggedIn } = useAuthStore()
	const { showAlert } = useAlert()
		const [resetRequested, setResetRequested] = useState(false)


  const userLogin = (data: LoginProps) => {
    login(data)
      .then((res) => {
        storeLogin(res.token)
        showAlert('로그인이 완료되었습니다.')
        navigate('/')
      })
      .catch((err) => {
        showAlert('로그인이 실패했습니다.')
      })
	}
	
	const userSignup = (data: SignupProps) => {
		signup(data).then(() => {
			showAlert('회원가입이 완료되었습니다.')
			navigate('/login')
		})
	}
	const userResetPassword = (data: SignupProps) => {
    resetPassword(data).then(() => {
      showAlert('비밀번호가 초기화되었습니다.')
      navigate('/login')
    })
	}
	
	const useResetRequest = (data: SignupProps) => {
		resetRequest(data).then(() => setResetRequested(true))
	}

  return { userLogin, userSignup, userResetPassword, useResetRequest, resetRequested }
}