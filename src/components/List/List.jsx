import Item from '@/components/Item'
import { useGetArticlesQuery } from '@/redux/articleApi'

function List() {
  const { data = [], isLoading, isError } = useGetArticlesQuery()

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (isError) {
    return <h1>Error Loading!</h1>
  }

  return (
    <ul>
      {data.articles.map((item) => (
        <Item key={item.slug} item={item} />
      ))}
    </ul>
  )
}

export default List
