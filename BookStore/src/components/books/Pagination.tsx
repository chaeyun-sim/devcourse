import { LIMIT } from '@/constants/pagination'
import { Pagination as IPagination } from '@/model/pagination.model'
import React from 'react'
import styled from 'styled-components'
import Button from '../common/Button'
import { QUERYSTRING } from '@/constants/queryString'
import { useQueryParams } from '@/hooks/useQueryParams'

interface Props {
  pagination: IPagination
}

const Pagination = ({ pagination }: Props) => {
  const { totalCount, currentPage } = pagination

  const { handleSearchParams } = useQueryParams()
  const pages = Math.ceil(totalCount / LIMIT)

  return (
    <PaginationStyle>
      {pages > 0 && (
        <ol>
          {Array(pages)
            .fill(0)
            .map((_, index) => (
              <li key={index + 1}>
                <Button
                  size="small"
                  scheme={currentPage === index + 1 ? 'primary' : 'normal'}
                  onClick={() => handleSearchParams(QUERYSTRING.PAGE, String(index + 1))}
                >
                  {index + 1}
                </Button>
              </li>
            ))}
        </ol>
      )}
    </PaginationStyle>
  )
}

export default Pagination

const PaginationStyle = styled.div``
