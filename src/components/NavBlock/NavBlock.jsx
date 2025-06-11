import { memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import AvaComponent from '@/components/AvaComponent'
import ROUTES from '@/services/routes'
import { clearUser } from '@/redux'

function NavBlock({ isMobile = false, setMobileMenuOpen }) {
  const { username, image, token } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const isAuthenticated = !!token

  const handleLogout = useCallback(() => {
    dispatch(clearUser())
    if (isMobile && setMobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }, [dispatch, isMobile, setMobileMenuOpen])

  const closeMobileMenu = useCallback(() => {
    if (isMobile && setMobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }, [isMobile, setMobileMenuOpen])

  if (isAuthenticated) {
    return (
      <>
        <Link
          to={ROUTES.CREATE_ARTICLE}
          className={`w-full text-center ${
            isMobile ? 'py-2' : 'mr-8'
          } rounded-md border-2 border-[#52C41A] px-3 py-1.5 text-[#52C41A] transition-colors duration-300 hover:bg-[#53c41a2d]`}
          onClick={closeMobileMenu}
        >
          Create article
        </Link>
        <Link
          to={ROUTES.PROFILE}
          className="flex items-center gap-2"
          onClick={closeMobileMenu}
        >
          <AvaComponent
            username={username}
            urlImg={image || '/icons/FallbackAvatar.png'}
            size={isMobile ? 'large' : 'default'}
          />
        </Link>
        <button
          type="button"
          className={`w-full ${
            isMobile ? 'py-2' : ''
          } rounded-md border-2 border-black px-4 py-1.5 text-black transition-colors duration-300 hover:bg-[#4d504c2d]`}
          onClick={handleLogout}
        >
          Log Out
        </button>
      </>
    )
  }

  return (
    <>
      <Link
        to={ROUTES.SIGN_IN}
        className={`w-full text-center ${
          isMobile ? 'py-2' : ''
        } rounded-md px-4 py-1.5 text-black transition-colors duration-300 hover:bg-[#4d504c2d]`}
        onClick={closeMobileMenu}
      >
        Sign In
      </Link>
      <Link
        to={ROUTES.SIGN_UP}
        className={`w-full text-center ${
          isMobile ? 'py-2' : ''
        } rounded-md border-2 border-[#52C41A] px-4 py-1.5 whitespace-nowrap text-[#52C41A] transition-colors duration-300 hover:bg-[#53c41a2d]`}
        onClick={closeMobileMenu}
      >
        Sign Up
      </Link>
    </>
  )
}

export default memo(NavBlock)
