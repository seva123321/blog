import { Link } from 'react-router-dom'
import { useState, useCallback } from 'react'

import ROUTES from '@/services/routes'
import NavBlock from '@/components/NavBlock'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  return (
    <header className="fixed top-0 right-0 left-0 z-50 mb-6 flex h-16 items-center justify-between bg-white px-4 text-lg shadow sm:h-20 sm:px-6">
      {/* Логотип */}
      <Link
        to={ROUTES.HOME}
        className="text-xl font-bold transition-transform duration-300 hover:scale-110 sm:text-2xl"
      >
        Realworld Blog
      </Link>

      {/* Кнопка меню для мобильных */}
      <button
        type="button"
        className="block sm:hidden"
        onClick={toggleMobileMenu}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <div className="cursor-pointer rounded border border-black px-2 text-2xl transition-transform duration-300 hover:scale-110">
          {mobileMenuOpen ? '×' : '≡'}
        </div>
      </button>

      {/* Навигация (десктоп) */}
      <nav className="hidden items-center gap-4 sm:flex sm:gap-7">
        <NavBlock setMobileMenuOpen={setMobileMenuOpen} />
      </nav>

      {/* Мобильное меню */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white py-4 shadow-lg sm:hidden">
          <nav className="flex flex-col items-center gap-4">
            <NavBlock isMobile setMobileMenuOpen={setMobileMenuOpen} />
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
