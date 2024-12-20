import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

interface Props {
  children: ReactNode
	linelimit: number;
}

const EllipsisBox = ({ children, linelimit }: Props) => {
	const [expanded, setExpanded] = useState(false)

  return (
    <EllipsisBoxStyle linelimit={linelimit} expanded={expanded}>
			<p>{children}</p>
			<div className="toggle">
				<Button size='small' scheme='normal' onClick={() => setExpanded(!expanded)}>{ expanded ? '접기' : '펼치기'}</Button>
			</div>
    </EllipsisBoxStyle>
  )
}

export default EllipsisBox;

const EllipsisBoxStyle = styled.div<Pick<Props, 'linelimit'> & { expanded: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${({ linelimit, expanded }) => expanded ? 'none' : linelimit};
  -webkit-box-orient: verticla;

	.toggle {
		display: flex;
		justify-content: end;
		svg {
			transform: ${({expanded}) => expanded ? 'rotate(100deg)' : 'rotate(0)'}
		}
	}
`