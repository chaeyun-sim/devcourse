import Button from '@/components/common/Button';
import InputText from '@/components/common/Input';
import Title from '@/components/common/Title';
import React from 'react';

const Home = () => {
  return (
    <>
      <Title size="medium" color="background">제목</Title>
      <Button size="large" scheme='primary'>버튼 텍스트</Button>
      <InputText placeholder='여기를 입력하세요' />
    </>
  )
}

export default Home
