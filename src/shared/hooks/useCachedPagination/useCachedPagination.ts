import { useRef } from 'react'

interface UseCachedPaginationParams<Response, Data> {
  fetchData: (page: number) => Promise<Response>
  getResults: (response: Response) => Data[]
  initialData: {
    page: number
    data: Data[]
  }
}

export const useCachedPagination = <Response, Data>(
  params: UseCachedPaginationParams<Response, Data>,
) => {
  const cachedData = useRef<Map<number, Data[]>>(
    new Map([[params.initialData.page, params.initialData.data]]),
  )

  const cachedFetchData = async (page: number) => {
    const cachedPage = cachedData.current.get(page)

    if (cachedPage) {
      return cachedPage
    }

    const response = await params.fetchData(page)
    const data = params.getResults(response)

    cachedData.current.set(page, data)

    return data
  }

  return { cachedData, cachedFetchData }
}
