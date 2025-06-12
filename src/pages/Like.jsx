/* eslint-disable no-unused-expressions */
import { memo } from 'react'
import { useSelector } from 'react-redux'

import { useLikedArticleMutation, useUnLikedArticleMutation } from '@/redux'

function Like({ slug, favorited, favoritesCount }) {
  const [likedArticle] = useLikedArticleMutation()
  const [unLikedArticle] = useUnLikedArticleMutation()
  const token = useSelector((state) => state.user.token)

  const isAbilityLike = favorited && token

  const handleLickedArticle = async () => {
    if (token) {
      favorited
        ? await unLikedArticle(slug).unwrap()
        : await likedArticle(slug).unwrap()
    }
  }

  return (
    <button
      type="button"
      onClick={handleLickedArticle}
      className="mb-3 ml-1 flex items-center sm:mb-0 sm:ml-3"
      aria-label={isAbilityLike ? 'Remove like' : 'Add like'}
    >
      <div className="pr-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className={`h-4 w-4 ${isAbilityLike ? 'text-red-600' : 'text-gray-600'}`}
          fill="currentColor"
        >
          {/* Единый path с clipPath для точного соответствия контуру */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.99998 15.1099C7.7722 15.1099 7.5526 15.0273 7.38146 14.8774C6.73509 14.3123 6.11193 13.7811 5.56212 13.3126L5.55932 13.3102C3.94738 11.9365 2.55542 10.7502 1.58691 9.58167C0.504272 8.27527 0 7.03662 0 5.68347C0 4.36877 0.450805 3.15588 1.26928 2.26807C2.09753 1.36975 3.234 0.875 4.46972 0.875C5.3933 0.875 6.23912 1.16699 6.98363 1.7428C7.35936 2.03345 7.69994 2.38916 7.99998 2.80408C8.30015 2.38916 8.64061 2.03345 9.01646 1.7428C9.76097 1.16699 10.6068 0.875 11.5304 0.875C12.766 0.875 13.9026 1.36975 14.7308 2.26807C15.5493 3.15588 16 4.36877 16 5.68347C16 7.03662 15.4958 8.27527 14.4132 9.58154C13.4447 10.7502 12.0528 11.9364 10.4411 13.3099C9.89036 13.7792 9.26622 14.3112 8.61839 14.8777C8.44737 15.0273 8.22765 15.1099 7.99998 15.1099Z"
            className={isAbilityLike ? 'opacity-100' : 'opacity-75'}
          />
        </svg>
      </div>

      <span className={`${isAbilityLike ? 'text-red-600' : 'text-gray-600'}`}>
        {favoritesCount}
      </span>
    </button>
  )
}

export default memo(Like)
