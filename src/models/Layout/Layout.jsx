import { Outlet } from 'react-router-dom'

import Header from '@/models/Header'

function Layout() {
  return (
    <>
      <Header />

      <main className="container mx-auto mt-24 border-[0.001px] border-transparent">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
