import React, { PropsWithChildren } from 'react';

interface MyProps {
	weather: string;
}

const MyWeather: React.FC<PropsWithChildren<MyProps>> = ({ children, weather }) => {
	return (
    <div>
      {children}
      <p>오늘의 날씨는 {weather} 입니다.</p>
    </div>
  );
};

export default MyWeather;