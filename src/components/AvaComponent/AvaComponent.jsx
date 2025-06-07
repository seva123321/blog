import { memo } from 'react'

function AvaComponent({ username = '', date = '', urlImg = '' }) {
  return (
    <div
      className={`flex ${date ? 'items-start' : 'items-center'} justify-end`}
    >
      <div className="mr-3 flex flex-col">
        <span className="text-sm font-medium sm:text-base">{username}</span>
        <span className="text-xs text-gray-400 sm:text-sm">{date}</span>
      </div>
      <img
        src={urlImg}
        // eslint-disable-next-line no-return-assign
        onError={(e) => (e.currentTarget.src = '/icons/FallbackAvatar.png')}
        className="h-10 w-10 rounded-full sm:h-12 sm:w-12"
        alt="avatar"
      />
    </div>
  )
}

export default memo(AvaComponent)
