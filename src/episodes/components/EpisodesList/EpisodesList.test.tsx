import { render, screen } from '@testing-library/react'

import { mockEpisode } from '@/episodes/testMocks/Episode'

import { EpisodesList } from './EpisodesList'

describe('EpisodesList', () => {
  it('should render the episodes list if there are episodes', () => {
    render(<EpisodesList episodes={[mockEpisode]} title='Episodes' />)

    expect(screen.getByText(mockEpisode.name)).toBeInTheDocument()
    expect(screen.getByText(mockEpisode.air_date, { exact: false })).toBeInTheDocument()
  })

  it('should render a message if there are no episodes', () => {
    render(<EpisodesList episodes={[]} title='Episodes' />)

    expect(screen.getByText('No episodes found')).toBeInTheDocument()
  })

  it('should render a skeleton if isLoading is true', () => {
    render(<EpisodesList episodes={[]} title='Episodes' isLoading />)

    expect(screen.getByTestId('episode-card-skeleton')).toBeInTheDocument()
  })
})
