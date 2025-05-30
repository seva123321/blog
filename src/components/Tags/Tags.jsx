function Tags({ tagList }) {
  return (
    <ul className="mb-1.5 flex gap-2">
      {tagList.map((item) => (
        <li className="rounded-md border border-gray-400 px-2 py-1 text-[12px]">
          {!!item && item}
        </li>
      ))}
    </ul>
  )
}

export default Tags
