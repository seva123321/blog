import { Link } from 'react-router-dom'

import Tags from '@/components/Tags'
import AvaComponent from '@/components/AvaComponent'
import { getDateString } from '@/services/utils'

function Item({ item, isShadow = false }) {
  const {
    slug,
    author,
    createdAt,
    description,
    favoritesCount,
    tagList,
    title,
    updatedAt,
  } = item

  return (
    <div
      className={`flex flex-col bg-white p-4 ${isShadow && 'shadow-md'} sm:flex-row sm:justify-between sm:p-5`}
    >
      <div className="mb-4 sm:mr-4 sm:mb-0 sm:flex-1">
        <div className="flex items-center sm:flex-row">
          <Link
            to={`/articles/${slug}`}
            className="mb-2 text-xl font-semibold text-blue-600 sm:mb-0 sm:text-2xl"
          >
            {title}
          </Link>
          <div className="mb-3 ml-1 flex sm:mb-0 sm:ml-3">
            <img className="w-4" src="/icons/heart.svg" alt="likes" />
            <span className="ml-1 text-gray-600">{favoritesCount}</span>
          </div>
        </div>

        <Tags tagList={tagList} />
        <p className="text-gray-700">{description}</p>
      </div>
      <AvaComponent
        username={author.username}
        date={getDateString(updatedAt, createdAt)}
        urlImg={author.image}
      />
    </div>
  )
}

export default Item
