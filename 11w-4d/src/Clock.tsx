import React, { useEffect, useState } from 'react';

const Clock = () => {
	const [time, setTime] = useState(new Date())

	setInterval(() => {
    setTime(new Date());
  }, 1000);
	
	return (
    <div>
      현재 시간 : {time.toLocaleTimeString()}
    </div>
  );
};

export default Clock;