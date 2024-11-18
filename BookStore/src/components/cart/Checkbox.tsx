import React from 'react';
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';
import styled from 'styled-components';

interface Props {
  isChecked: boolean
	onCheck: () => void;
}

const Checkbox = ({ isChecked, onCheck }: Props) => {
  return (
    <CheckboxStyle onClick={onCheck}>
      {isChecked ? <FaRegCheckCircle /> : <FaRegCircle />}
    </CheckboxStyle>
  )
}

export default Checkbox;

const CheckboxStyle = styled.button`
	background-color: none;
	border: 0;
	cursor: pointer;
	
	svg {
		width: 24px;
		height: 24px;
	}
`