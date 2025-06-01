import { Link } from 'react-router-dom'

import AvaComponent from '@/components/AvaComponent'

function Header() {
  return (
    <div className="fixed top-0 right-0 left-0 z-10 mb-6 flex h-20 items-center justify-between bg-white px-6 text-[18px] shadow">
      <div className="">Realworld Blog</div>

      <div className="flex items-center gap-7">
        <div className="">
          <Link
            to="create_article"
            className="cursor-pointer rounded-md border-2 border-[#52C41A] px-3 py-1.5 whitespace-nowrap text-[#52C41A] transition-colors duration-300 hover:bg-[#53c41a2d]"
          >
            Create article
          </Link>
        </div>
        <AvaComponent username="ИМЯ" urlImg="/icons/FallbackAvatar.png" />

        <div className="">
          <button
            type="button"
            className="cursor-pointer rounded-md border-2 border-black px-4 py-2.5 whitespace-nowrap text-black transition-colors duration-300 hover:bg-[#4d504c2d]"
          >
            Log Out
          </button>
          <Link
            to="sign_up"
            className="cursor-pointer rounded-md border-2 border-[#52C41A] px-4 py-2.5 whitespace-nowrap text-[#52C41A] transition-colors duration-300 hover:bg-[#53c41a2d]"
          >
            Sign Up
          </Link>
          <Link
            to="sign_in"
            className="cursor-pointer rounded-md border-2 border-black px-4 py-2.5 whitespace-nowrap text-black transition-colors duration-300 hover:bg-[#4d504c2d]"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
