import { Banner as IBanner } from '@/model/banner.model';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import BannerItem from './BannerItem';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface Props {
  banners: IBanner[]
}

const Banner = ({ banners }: Props) => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const transformValue = useMemo(() => currentIndex * -100, [currentIndex])

	const handlePrev = () => {
		if (currentIndex === 0) return
		setCurrentIndex(currentIndex - 1)
	}

	const handleNext = () => {
		if (currentIndex === banners.length - 1) return;
			setCurrentIndex(currentIndex + 1)
	}

	const handleIndicatorClick = (index: number) => {
		setCurrentIndex(index)
	}

	return (
    <BannerStyle>
      <BannerContainerStyle transformValue={transformValue}>
        {banners.map((banner) => (
          <BannerItem key={banner.id} banner={banner} />
        ))}
      </BannerContainerStyle>
      <BannerButtonStyle>
        <button onClick={handlePrev}>
          <FaAngleLeft />
        </button>
        <button onClick={handleNext}>
          <FaAngleRight />
        </button>
      </BannerButtonStyle>

      <BannerIndicatorStyle>
        {banners.map((banner, index) => (
          <span
            key={banner.id}
            className={index === currentIndex ? 'active' : ''}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </BannerIndicatorStyle>
    </BannerStyle>
  )
}

export default Banner;

const BannerStyle = styled.div`
	overflow: hidden;
`;

const BannerContainerStyle = styled.div<{ transformValue: number }>`
  display: flex;
  transform: translateX(${(props) => props.transformValue}%);
	transition: transform 0.5s ease-in-out;
`

const BannerButtonStyle = styled.div`
  button {
    border: 0;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 500px;
    font-size: 2rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateX(-50%) svg {
      fill: #fff;
    }

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }

    @media screen AND (${({ theme }) => theme.mediaQuery.mobile}) {
      width: 28px;
      height: 28px;
      font-size: 1.5rem;
      &.prev {
        left: 0;
      }
      &.next {
        right: 0;
      }
    }
  }
`

const BannerIndicatorStyle = styled.div`
  span {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 100px;
    background: white;
    margin: 0 4px;
    cursor: pointer;

    &.active {
      background: ${({ theme }) => theme.color.primary};
    }
  }

  @media screen AND (${({ theme }) => theme.mediaQuery.mobile}) {
    bottom: 0;
    span {
      width: 12px;
      height: 12px;
      &.active {
        width: 24px;
      }
    }
  }
`