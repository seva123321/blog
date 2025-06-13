import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import ArticlesPage from '@/pages/ArticlesPage'
import OneArticlePage from '@/pages/OneArticlePage'
import Layout from '@/models/Layout'
import ROUTES from '@/services/routes'

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const SignUpForm = lazy(() => import('@/pages/SignUpForm'))
const SignInForm = lazy(() => import('@/pages/SignInForm'))
const ProfileForm = lazy(() => import('@/pages/ProfileForm'))
const EditPage = lazy(() => import('@/pages/EditPage'))
const CreatePage = lazy(() => import('@/pages/CreatePage'))
const GoBackProvider = lazy(() => import('@/hoc/GoBackProvider'))

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<ArticlesPage />} />
        <Route path={ROUTES.ARTICLES} element={<ArticlesPage />} />
        <Route path={ROUTES.ARTICLE} element={<OneArticlePage />} />
        <Route
          path={ROUTES.ARTICLE_EDIT}
          element={
            <GoBackProvider>
              <EditPage />
            </GoBackProvider>
          }
        />
        <Route
          path={ROUTES.SIGN_UP}
          element={
            <GoBackProvider>
              <SignUpForm />
            </GoBackProvider>
          }
        />
        <Route
          path={ROUTES.SIGN_IN}
          element={
            <GoBackProvider>
              <SignInForm />
            </GoBackProvider>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <GoBackProvider>
              <ProfileForm />
            </GoBackProvider>
          }
        />
        <Route
          path={ROUTES.CREATE_ARTICLE}
          element={
            <GoBackProvider>
              <CreatePage />
            </GoBackProvider>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
