import { render, screen } from '@testing-library/react'

import { MAX_VISIBLE_PAGES, Pagination, SIDE_PAGES_AROUND_CURRENT_PAGE } from './Pagination'

describe('Pagination', () => {
  it('should render just the first page button if just there is one page', () => {
    render(<Pagination currentPage={1} onPageChange={jest.fn()} totalPages={1} />)

    const firstPageButton = screen.getByRole('button', { name: 'Go to page 1' })
    const previousPageButton = screen.queryByRole('button', { name: 'Go to previous page' })
    const nextPageButton = screen.queryByRole('button', { name: 'Go to next page' })

    expect(firstPageButton).toBeInTheDocument()
    expect(previousPageButton).not.toBeInTheDocument()
    expect(nextPageButton).not.toBeInTheDocument()
  })

  it('should render the next page button if the current page is not the last page', () => {
    render(<Pagination currentPage={2} onPageChange={jest.fn()} totalPages={10} />)

    const nextPageButton = screen.getByRole('button', { name: 'Go to next page' })

    expect(nextPageButton).toBeInTheDocument()
  })

  it('should render the previous page button if the current page is not the first page', () => {
    render(<Pagination currentPage={2} onPageChange={jest.fn()} totalPages={10} />)

    const previousPageButton = screen.getByRole('button', { name: 'Go to previous page' })

    expect(previousPageButton).toBeInTheDocument()
  })

  // I wish I could use the MAX_VISIBLE_PAGES for this string but the build failed :(
  it(`should render just one "..." symbol if there are more than 5 pages and user is in the first/last pages`, () => {
    const { rerender } = render(
      <Pagination currentPage={1} onPageChange={jest.fn()} totalPages={MAX_VISIBLE_PAGES} />,
    )

    expect(screen.queryByText('...')).not.toBeInTheDocument()

    rerender(
      <Pagination currentPage={1} onPageChange={jest.fn()} totalPages={MAX_VISIBLE_PAGES + 1} />,
    )

    expect(screen.getAllByText('...')).toHaveLength(1)
  })

  // I wish I could use the MAX_VISIBLE_PAGES and SIDE_PAGES_AROUND_CURRENT_PAGE for this string but the build failed :(
  it(`it should render two "..." symbols if there are more than 9 pages and user is in the middle of the pages`, () => {
    const LIMIT_BEFORE_SPREAD_SYMBOLS = MAX_VISIBLE_PAGES + 2 * SIDE_PAGES_AROUND_CURRENT_PAGE

    const { rerender } = render(
      <Pagination
        currentPage={Math.floor(LIMIT_BEFORE_SPREAD_SYMBOLS / 2)}
        onPageChange={jest.fn()}
        totalPages={LIMIT_BEFORE_SPREAD_SYMBOLS}
      />,
    )

    expect(screen.getAllByText('...')).toHaveLength(1)

    const afterLimitTotalPages = LIMIT_BEFORE_SPREAD_SYMBOLS + 1

    rerender(
      <Pagination
        currentPage={Math.floor(afterLimitTotalPages / 2)}
        onPageChange={jest.fn()}
        totalPages={afterLimitTotalPages}
      />,
    )

    expect(screen.getAllByText('...')).toHaveLength(2)
  })
})
