// StoreProvider.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { Provider } from 'react-redux'

import { createStore } from '@/redux'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [store, setStore] = useState(null)

  useEffect(() => {
    createStore().then(setStore)
  }, [])

  if (!store) return <div>Loading...</div>

  return (
    <Provider store={store}>
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    </Provider>
  )
}

export const useStore = () => useContext(StoreContext)
