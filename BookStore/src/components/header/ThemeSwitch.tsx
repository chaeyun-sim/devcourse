import { ThemeContext } from '@/context/themeContext';
import React, { useContext } from 'react';

const ThemeSwitch = () => {
	const { themeName, toggleTheme } = useContext(ThemeContext);

  return <button onClick={toggleTheme}>{themeName}</button>
}

export default ThemeSwitch;