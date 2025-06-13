import { useNavigate } from 'react-router-dom'

const GoBackProvider = ({ children }) => {
  const navigate = useNavigate()

  return (
    <>
      <button
        type="button"
        className="mb-2 cursor-pointer text-[#1890FF] transition-transform duration-300 hover:scale-110"
        onClick={() => navigate(-1)}
      >
        &#8678; НАЗАД
      </button>
      {children}
    </>
  )
}

export default GoBackProvider
