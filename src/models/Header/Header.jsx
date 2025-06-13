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
    <div className="fixed top-0 right-0 left-0 z-50 bg-white shadow-sm">
      <header className="container mx-auto flex h-16 items-center justify-between px-4 sm:h-20 sm:px-6">
        {/* Логотип */}
        <Link
          to={ROUTES.HOME}
          className="text-xl font-bold text-gray-900 transition-transform duration-300 hover:scale-105 hover:text-gray-700 sm:text-2xl"
        >
          Realworld Blog
        </Link>

        {/* Кнопка меню для мобильных */}
        <button
          type="button"
          className="rounded p-1 text-gray-700 transition-all hover:bg-gray-100 active:scale-95 sm:hidden"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="block h-6 w-6 text-2xl leading-6">
            {mobileMenuOpen ? '×' : '≡'}
          </span>
        </button>

        {/* Навигация (десктоп) */}
        <nav className="hidden sm:flex sm:items-center sm:gap-6">
          <NavBlock setMobileMenuOpen={setMobileMenuOpen} />
        </nav>

        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full border-t border-gray-100 bg-white py-3 shadow-lg sm:hidden">
            <nav className="flex flex-col items-center gap-3 px-4">
              <NavBlock isMobile setMobileMenuOpen={setMobileMenuOpen} />
            </nav>
          </div>
        )}
      </header>
    </div>
  )
}

export default Header
