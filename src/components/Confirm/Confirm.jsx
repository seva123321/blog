import { memo, useState } from 'react'

function Confirm({ slug, onDelete, setShowConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = () => {
    setIsDeleting(true)
    try {
      onDelete(slug)
    } finally {
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }
  return (
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
  )
}

export default memo(Confirm)
