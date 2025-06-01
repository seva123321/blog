import { Outlet } from 'react-router-dom'

import Header from '@/models/Header'

function Layout() {
  return (
    <>
      <Header />

      <main className="container mx-auto mt-24">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
