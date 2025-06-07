import { Link } from 'react-router-dom'
import { useMemo } from 'react'

import Tags from '@/components/Tags'
import AvaComponent from '@/components/AvaComponent'
import { getDateString } from '@/services/utils'
import ROUTES from '@/services/routes'

function Item({ item, isPart = false, isAuth = false }) {
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

  const tagListFiltered = useMemo(
    () => tagList.filter((t) => String(t).trim() !== ''),
    [tagList],
  )

  return (
    <div
      className={`flex flex-col bg-white p-4 ${isPart && 'shadow-md'} sm:flex-row sm:justify-between sm:p-5`}
    >
      <div className="mb-4 sm:mr-4 sm:mb-0 sm:flex-1">
        <div className="flex items-center sm:flex-row">
          <Link
            to={`${ROUTES.ARTICLES}/${slug}`}
            className="mb-2 text-xl font-semibold text-blue-600 sm:mb-0 sm:text-2xl"
          >
            {title}
          </Link>
          <div className="mb-3 ml-1 flex sm:mb-0 sm:ml-3">
            <img className="w-4" src="/icons/heart.svg" alt="likes" />
            <span className="ml-1 text-gray-600">{favoritesCount}</span>
          </div>
        </div>

        <Tags tagList={tagListFiltered} />
        <p className="text-gray-700">{description}</p>
      </div>
      <div className="text-right">
        <div className="mb-7">
          <AvaComponent
            username={author.username}
            date={getDateString(updatedAt, createdAt)}
            urlImg={author.image}
          />
        </div>
        {isAuth && (
          <div>
            <button
              type="button"
              className="mr-3 cursor-pointer rounded-md border-2 border-[#F5222D] px-5 py-2 whitespace-nowrap text-[#F5222D] transition-colors duration-300 hover:bg-[#e1929269]"
            >
              Delete
            </button>
            <Link
              to={`${ROUTES.ARTICLES}/${slug}/edit`}
              className="inline-block cursor-pointer rounded-md border-2 border-[#52C41A] px-5 py-2 whitespace-nowrap text-[#52C41A] transition-colors duration-300 hover:bg-[#53c41a2d]"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Item
