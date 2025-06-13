import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ROUTES from '@/services/routes'

const RequireAuth = ({ children }) => {
  const navigate = useNavigate()
  const token = useSelector((state) => state.user.token)

  if (!token) {
    navigate(ROUTES.SIGN_IN)
  }

  return children
}

export default RequireAuth
