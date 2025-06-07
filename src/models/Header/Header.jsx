import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import AvaComponent from '@/components/AvaComponent'
import ROUTES from '@/services/routes'
import { clearUser } from '@/redux'

function Header() {
  const { username, image, token } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const isAuthenticated = !!token

  return (
    <header className="fixed top-0 right-0 left-0 z-10 mb-6 flex h-20 items-center justify-between bg-white px-6 text-[18px] shadow">
      <Link
        to={ROUTES.HOME}
        className="transition-transform duration-300 hover:scale-110"
      >
        Realworld Blog
      </Link>

      <div className="flex items-center gap-7">
        {isAuthenticated ? (
          <>
            <div className="">
              <Link
                to={ROUTES.CREATE_ARTICLE}
                className="cursor-pointer rounded-md border-2 border-[#52C41A] px-3 py-1.5 whitespace-nowrap text-[#52C41A] transition-colors duration-300 hover:bg-[#53c41a2d]"
              >
                Create article
              </Link>
            </div>
            <Link to={ROUTES.PROFILE}>
              <AvaComponent
                username={username}
                urlImg={image || '/icons/FallbackAvatar.png'}
              />
            </Link>
            <button
              type="button"
              className="cursor-pointer rounded-md border-2 border-black px-4 py-2.5 whitespace-nowrap text-black transition-colors duration-300 hover:bg-[#4d504c2d]"
              onClick={() => dispatch(clearUser())}
            >
              Log Out
            </button>
          </>
        ) : (
          <div className="">
            <Link
              to={ROUTES.SIGN_IN}
              className="cursor-pointer rounded-md px-4 py-2.5 whitespace-nowrap text-black transition-colors duration-300 hover:bg-[#4d504c2d]"
            >
              Sign In
            </Link>
            <Link
              to={ROUTES.SIGN_UP}
              className="cursor-pointer rounded-md border-2 border-[#52C41A] px-4 py-2.5 whitespace-nowrap text-[#52C41A] transition-colors duration-300 hover:bg-[#53c41a2d]"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
