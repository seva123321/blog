import { Link } from 'react-router-dom'
import { lazy, memo, useMemo, useState } from 'react'

import Tags from '@/components/Tags'
import AvaComponent from '@/components/AvaComponent'
import { getDateString } from '@/services/utils'
import ROUTES from '@/services/routes'
import Like from '@/components/Like'

const Confirm = lazy(() => import('@/components/Confirm'))

function Item({
  item,
  isPart = false,
  isAuth = false,
  isSameUser = false,
  onDelete = () => {},
}) {
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    slug,
    author,
    createdAt,
    description,
    favoritesCount,
    favorited,
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
      className={`relative flex flex-col bg-white p-4 ${isPart && 'shadow-md'} sm:flex-row sm:justify-between sm:p-5`}
    >
      <div className="mb-4 sm:mr-4 sm:mb-0 sm:flex-1">
        <div className="mb-2 flex items-center sm:flex-row">
          {isPart ? (
            <Link
              to={`${ROUTES.ARTICLES}/${slug}`}
              className="text-xl font-semibold text-blue-600 sm:mb-0 sm:text-2xl"
            >
              {title}
            </Link>
          ) : (
            <h1 className="text-xl font-semibold text-blue-600 sm:mb-0 sm:text-2xl">
              {title}
            </h1>
          )}
          <Like
            slug={slug}
            isAuth={isAuth}
            favorited={favorited}
            favoritesCount={favoritesCount}
          />
        </div>

        <Tags tagList={tagListFiltered} />
        <p className="mt-2 line-clamp-3 text-gray-700">{description}</p>
      </div>
      <div className="text-right">
        <div className="mb-7">
          <AvaComponent
            username={author.username}
            date={getDateString(updatedAt, createdAt)}
            urlImg={author.image}
          />
        </div>
        {isAuth && isSameUser && (
          <div>
            {showConfirm && (
              <Confirm
                slug={slug}
                onDelete={onDelete}
                setShowConfirm={setShowConfirm}
              />
            )}
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
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

export default memo(Item)
