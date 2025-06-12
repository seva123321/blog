function Pagination({ currentPage, onPageChange, totalPages }) {
  const createPaginationItems = () => {
    if (totalPages <= 1) return null

    const items = []
    const maxVisiblePages = 5
    let startPage
    let endPage

    if (totalPages <= maxVisiblePages) {
      startPage = 1
      endPage = totalPages
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2)
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1

      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1
        endPage = maxVisiblePages
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1
        endPage = totalPages
      } else {
        startPage = currentPage - maxPagesBeforeCurrent
        endPage = currentPage + maxPagesAfterCurrent
      }
    }

    // Кнопка "Первая страница"
    if (startPage > 1) {
      items.push(
        <button
          type="button"
          key="first"
          onClick={() => onPageChange(1)}
          className="rounded px-3 py-1 hover:bg-gray-100"
        >
          1
        </button>,
      )
      if (startPage > 2) {
        items.push(
          <span key="left-ellipsis" className="px-2">
            ...
          </span>,
        )
      }
    }

    // Основные кнопки страниц
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <button
          type="button"
          key={i}
          onClick={() => onPageChange(i)}
          className={`cursor-pointer rounded px-3 py-1 ${
            currentPage === i ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
          }`}
          aria-label={`Page ${i}`}
        >
          {i}
        </button>,
      )
    }

    // Кнопка "Последняя страница"
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <span key="right-ellipsis" className="px-2">
            ...
          </span>,
        )
      }
      items.push(
        <button
          type="button"
          key="last"
          onClick={() => onPageChange(totalPages)}
          className="cursor-pointer rounded px-3 py-1 hover:bg-gray-100"
        >
          {totalPages}
        </button>,
      )
    }

    return items
  }

  if (totalPages <= 1) return null

  return (
    <div className="my-8 flex items-center justify-center gap-1">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="cursor-pointer rounded px-3 py-1 hover:bg-gray-100 disabled:cursor-default disabled:opacity-50"
      >
        &lt;
      </button>

      {createPaginationItems()}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="cursor-pointer rounded px-3 py-1 hover:bg-gray-100 disabled:cursor-default disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  )
}

export default Pagination
