import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Title from './Title';

interface Props {
	icon?: ReactNode;
	title: string;
	description: ReactNode;
}

const Empty = ({icon, title, description}: Props) => {
	return (
    <EmptyStyle>
      <div className="icon">
				{icon && <div className="icon">{icon}</div>}
      </div>
      <Title size="large" color="secondary">
        {title}
      </Title>
			{description && <p>{description}</p>}
    </EmptyStyle>
  )
};

export default Empty;

const EmptyStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 120px 0;

  .icon {
    svg {
      font-size: 4rem;
      fill: #ccc;
    }
  }
`