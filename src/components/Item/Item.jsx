import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

import Tags from '@/components/Tags'
import AvaComponent from '@/components/AvaComponent'
import { getDateString } from '@/services/utils'
import ROUTES from '@/services/routes'
import Like from '@/components/Like'

function Item({
  item,
  isPart = false,
  isAuth = false,
  isSameUser = false,
  onDelete = {},
}) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete(slug)
    } finally {
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

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
              <div className="absolute top-2 right-4 z-10 rounded-md bg-white p-4 shadow-xl">
                <div className="align-center flex">
                  <span className="mr-1 h-6 w-6 rounded-full bg-amber-600 text-center text-white">
                    !
                  </span>
                  <p className="mb-3">Are you sure to delete this article?</p>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowConfirm(false)}
                    className="cursor-pointer rounded-md border px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="cursor-pointer rounded-md border bg-[#1890FF] px-3 py-1 text-white hover:bg-[#025bae]"
                  >
                    {isDeleting ? 'Deleting...' : 'Yes'}
                  </button>
                </div>
              </div>
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

export default Item
