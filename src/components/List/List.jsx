import { useState } from 'react'
import { useSelector } from 'react-redux'

import { useGetArticlesQuery } from '@/redux/articleApi'
import Item from '@/components/Item'
import Pagination from '@/components/Pagination'
import { PAGINATION_LIMIT } from '@/services/utils'

function List() {
  const [page, setPage] = useState(1)
  const {
    data = { articles: [], articlesCount: 0 },
    isLoading,
    isError,
  } = useGetArticlesQuery({ offset: (page - 1) * PAGINATION_LIMIT })
  const token = useSelector((state) => state.user.token)

  if (isLoading) {
    return <h1 className="text-center">Loading...</h1>
  }
  if (isError) {
    return <h1 className="text-center">Error Loading!</h1>
  }

  if (!data.articles.length) {
    return <h1 className="text-center">No articles found</h1>
  }

  return (
    <section>
      <ul>
        {data.articles.map((item) => (
          <li className="mb-6" key={item.slug}>
            <Item item={item} isPart isAuth={!!token} />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={Math.ceil(data.articlesCount / PAGINATION_LIMIT)}
      />
    </section>
  )
}

export default List
