import Tags from '@/components/Tags'

function Item({ item }) {
  const {
    author,
    // body,
    createdAt,
    description,
    // favorited,
    favoritesCount,
    // slug,
    tagList,
    title,
    updatedAt,
  } = item

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const dateArticle = updatedAt || createdAt
  const createdAtDate = new Date(dateArticle).toLocaleDateString(
    'en-En',
    options,
  )

  return (
    <li className="mb-6.5 flex min-h-35 justify-between bg-white px-5 py-4 shadow">
      <div className="">
        <div className="flex items-center">
          <span className="mb-1.5 text-[26px] text-[#1890FF]">{title}</span>
          <div className="ml-3.5 flex items-center">
            <img className="w-4.5" src="/icons/heart.svg" alt="likes" />
            <span className="ml-1">{favoritesCount}</span>
          </div>
        </div>

        <Tags tagList={tagList} />
        <p>{description}</p>
      </div>
      <div className="flex">
        <div className="flex flex-col">
          <span className="text-lg">{author.username}</span>
          <span className="text-3 text-gray-400">{createdAtDate}</span>
        </div>
        <img
          src={author.image}
          // eslint-disable-next-line no-return-assign
          onError={(e) => (e.currentTarget.src = '/icons/FallbackAvatar.jpg')}
          className="ml-3 h-12 w-12 rounded-full"
          alt="avatar"
        />
      </div>
    </li>
  )
}

export default Item
