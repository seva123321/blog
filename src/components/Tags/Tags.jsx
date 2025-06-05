/* eslint-disable react/no-array-index-key */
import { useState, memo } from 'react'

function Tags({ tagList = [] }) {
  const [showAll, setShowAll] = useState(false)
  const visibleTags = showAll ? tagList : tagList.slice(0, 2)
  const hiddenTagsCount = tagList.length - 2

  return (
    <div className="mb-3 flex flex-wrap items-center gap-2 break-words">
      {visibleTags.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="inline-flex items-center rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:border-blue-400 hover:text-blue-600"
        >
          {item}
        </span>
      ))}
      {!showAll && hiddenTagsCount > 0 && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="text-xs text-gray-500 hover:text-blue-600"
        >
          {`+${hiddenTagsCount} more`}
        </button>
      )}
    </div>
  )
}

export default memo(Tags)
