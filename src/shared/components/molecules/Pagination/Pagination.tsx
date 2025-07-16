'use client'

import { useMemo } from 'react'

import { cn } from '@/shared/utils/cn'

import { Button } from '../../atoms/Button/Button'

import styles from './Pagination.module.css'

interface PaginationProps {
  currentPage: number
  onPageChange: (page: number) => void
  totalPages: number
}

const MAX_VISIBLE_PAGES = 5
const SIDE_PAGES_AROUND_CURRENT_PAGE = 2

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const visiblePages = useMemo<(number | '...')[]>(() => {
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    const pages: (number | '...')[] = []

    const start = Math.max(
      currentPage - SIDE_PAGES_AROUND_CURRENT_PAGE,
      SIDE_PAGES_AROUND_CURRENT_PAGE,
    )

    const end = Math.min(currentPage + SIDE_PAGES_AROUND_CURRENT_PAGE, totalPages - 1)

    pages.push(1)

    if (start > SIDE_PAGES_AROUND_CURRENT_PAGE) {
      pages.push('...')
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages - SIDE_PAGES_AROUND_CURRENT_PAGE) {
      pages.push('...')
    }

    pages.push(totalPages)

    return pages
  }, [currentPage, totalPages])

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  return (
    <div className={styles.pagination}>
      <Button
        aria-label='Go to previous page'
        className={styles.paginationBtn}
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
        variant='ghost'
      >
        &lt;
      </Button>
      {visiblePages.map((page, index) =>
        page === '...' ? (
          <span key={`${String(page)}-${String(index)}`}>...</span>
        ) : (
          <Button
            aria-label={`Go to page ${String(page)}`}
            className={cn(styles.paginationBtn, page === currentPage && styles.paginationBtnActive)}
            key={page}
            onClick={() => onPageChange(page)}
            variant='ghost'
          >
            {page}
          </Button>
        ),
      )}
      <Button
        aria-label='Go to next page'
        className={styles.paginationBtn}
        disabled={isLastPage}
        onClick={() => onPageChange(currentPage + 1)}
        variant='ghost'
      >
        &gt;
      </Button>
    </div>
  )
}
