import React, { useEffect } from 'react'
import Button from '../common/Button'
import styled from 'styled-components'
import { FaList, FaTh } from 'react-icons/fa'
import { QUERYSTRING } from '@/constants/queryString'
import { useQueryParams } from '@/hooks/useQueryParams'

const viewOptions = [
  {
    value: 'list',
    icon: <FaList />
  },
  {
    value: 'grid',
    icon: <FaTh />
  }
]

export type ViewMode = 'grid' | 'list'

const BooksViewSwitcher = () => {
  const { handleSearchParams, hasKey } = useQueryParams()

  useEffect(() => {
    if (!hasKey(QUERYSTRING.VIEW)) {
      handleSearchParams(QUERYSTRING.VIEW, 'grid')
    }
  }, [])

  return (
    <ButtonsViewSwitcherStyle>
      {viewOptions.map((option) => (
        <Button
          key={option.value}
          size="medium"
          scheme={hasKey(QUERYSTRING.VIEW) === option.value ? 'primary' : 'normal'}
          onClick={() => handleSearchParams(QUERYSTRING.VIEW, option.value as ViewMode)}
        >
          {option.icon}
        </Button>
      ))}
    </ButtonsViewSwitcherStyle>
  )
}

export default BooksViewSwitcher

const ButtonsViewSwitcherStyle = styled.div``
