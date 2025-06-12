import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { setUser } from '@/redux'

const RequireAuth = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const savedToken = sessionStorage.getItem('authToken')
    const savedUsername = sessionStorage.getItem('username')
    const savedImage = sessionStorage.getItem('image')
    if (savedToken) {
      dispatch(
        setUser({
          token: savedToken,
          username: savedUsername,
          image: savedImage,
        }),
      )
    }
  }, [dispatch])

  return children
}

export default RequireAuth
