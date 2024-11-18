import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

interface Props {
	onCompleted: (address: string) => void;
}

const SCRIPT_URL = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'

const FindAddress = ({ onCompleted }: Props) => {
	// TODO: 스크립트 로드
	useEffect(() => {
		const script = document.createElement('script');
		script.src = SCRIPT_URL;
		script.async = true;
		document.head.appendChild(script)

		return () => {
			document.head.removeChild(script)
		}
	}, [])

	// TODO: 핸들러
	const handleOpen = () => {
		new window.daum.Postcode({
			oncomplete: (data: any) => {
				onCompleted(data.address as string)
			}
		}).open()
	}

	// TODO: 입력
  return (
    <Button type="button" size="medium" scheme="normal" onClick={handleOpen}>
      주소 찾기
    </Button>
  )
}

export default FindAddress;

const FindAddressButtonStyle = styled.div``