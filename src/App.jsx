import { Route, Routes } from 'react-router-dom'

import ArticlesPage from '@/pages/ArticlesPage'
import OneArticlePage from '@/pages/OneArticlePage'
import RegPage from '@/pages/RegPage'
import NotFoundPage from '@/pages/NotFoundPage'
import EditForm from '@/pages/EditForm'
import Layout from '@/models/Layout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticlesPage />} />
        <Route path="articles" element={<ArticlesPage />} />
        <Route path="articles/:slug" element={<OneArticlePage />} />
        <Route path="sign_up" element={<RegPage />} />
        <Route path="sign_in" element={<RegPage />} />
        <Route path="create_article" element={<EditForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
