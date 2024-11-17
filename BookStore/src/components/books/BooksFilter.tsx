import { useCategory } from '@/hooks/useCategory'
import React from 'react'
import styled from 'styled-components'
import Button from '../common/Button'
import { QUERYSTRING } from '@/constants/queryString'
import { useQueryParams } from '@/hooks/useQueryParams'

const BooksFilter = () => {
  const { category } = useCategory()
  const { handleSearchParams, hasKey } = useQueryParams()

  return (
    <BooksFilterStyle>
      <div className="category">
        {category.map((item) => (
          <Button
            size="medium"
            scheme={item.isActive ? 'primary' : 'normal'}
            key={item.id}
            onClick={() => handleSearchParams(QUERYSTRING.CATEGORY_ID, String(item.id), true)}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className="new">
        <Button
          size="medium"
          scheme={hasKey(QUERYSTRING.NEWS) ? 'primary' : 'normal'}
          onClick={() => handleSearchParams(QUERYSTRING.NEWS, 'true', true)}
        >
          신간
        </Button>
      </div>
    </BooksFilterStyle>
  )
}

export default BooksFilter

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
  }
`
