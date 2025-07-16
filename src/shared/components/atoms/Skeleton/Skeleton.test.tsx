import { render, screen } from '@testing-library/react'

import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('should render skeleton if isLoading is true', () => {
    render(
      <Skeleton data-testid='skeleton-test' isLoading>
        <div data-testid='children-test'>Children</div>
      </Skeleton>,
    )

    expect(screen.getByTestId('skeleton-test')).toBeInTheDocument()
    expect(screen.queryByTestId('children-test')).not.toBeInTheDocument()
  })

  it('should render children if isLoading is false', () => {
    render(
      <Skeleton data-testid='skeleton-test' isLoading={false}>
        <div data-testid='children-test'>Children</div>
      </Skeleton>,
    )

    expect(screen.queryByTestId('skeleton-test')).not.toBeInTheDocument()
    expect(screen.getByTestId('children-test')).toBeInTheDocument()
  })

  it('should render template instead of skeleton if template is provided', () => {
    render(
      <Skeleton
        data-testid='skeleton-test'
        isLoading
        template={<div data-testid='template-test'>Template</div>}
      >
        <div data-testid='children-test'>Children</div>
      </Skeleton>,
    )

    expect(screen.queryByTestId('skeleton-test')).not.toBeInTheDocument()
    expect(screen.getByTestId('template-test')).toBeInTheDocument()
    expect(screen.queryByTestId('children-test')).not.toBeInTheDocument()
  })
})
