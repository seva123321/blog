import { Route, Routes } from 'react-router-dom'

import ArticlesPage from '@/pages/ArticlesPage'
import OneArticlePage from '@/pages/OneArticlePage'
// import RegPage from '@/pages/RegPage'
import NotFoundPage from '@/pages/NotFoundPage'
import EditForm from '@/pages/EditForm'
import Layout from '@/models/Layout'
import ROUTES from '@/services/routes'
import SignUpForm from '@/pages/SignUpForm'
import SignInForm from '@/pages/SignInForm'
import ProfileForm from '@/pages/ProfileForm'

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<ArticlesPage />} />
        <Route path={ROUTES.ARTICLES} element={<ArticlesPage />} />
        <Route path={ROUTES.ARTICLE} element={<OneArticlePage />} />
        <Route path={ROUTES.ARTICLE_EDIT} element={<EditForm />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpForm />} />
        <Route path={ROUTES.SIGN_IN} element={<SignInForm />} />
        <Route path={ROUTES.PROFILE} element={<ProfileForm />} />
        <Route path={ROUTES.CREATE_ARTICLE} element={<EditForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
