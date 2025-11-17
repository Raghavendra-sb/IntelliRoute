import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const Ctx = createContext({ queries: [], addQuery: () => {} })

export function GlobalQueryProvider({ children }) {
  const [queries, setQueries] = useState(() => {
    const raw = localStorage.getItem('intelliroute_history')
    return raw ? JSON.parse(raw) : []
  })

  useEffect(() => {
    localStorage.setItem('intelliroute_history', JSON.stringify(queries))
  }, [queries])

  const addQuery = q => setQueries(prev => [q, ...prev])

  const value = useMemo(() => ({ queries, addQuery }), [queries])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useGlobalQueries() {
  return useContext(Ctx)
}