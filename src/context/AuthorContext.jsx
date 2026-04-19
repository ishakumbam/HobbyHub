import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const KEY = 'hobbyhub-author-id'
const AuthorContext = createContext(null)

/** Stable browser id — posts created here are editable by this session */
export function AuthorProvider({ children }) {
  const [authorId, setAuthorId] = useState(() => {
    try {
      const existing = localStorage.getItem(KEY)
      if (existing) return existing
      const next =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `anon-${Date.now()}`
      localStorage.setItem(KEY, next)
      return next
    } catch {
      return `anon-${Date.now()}`
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, authorId)
    } catch {
      /* ignore */
    }
  }, [authorId])

  return (
    <AuthorContext.Provider value={authorId}>
      {children}
    </AuthorContext.Provider>
  )
}

export function useAuthorId() {
  const id = useContext(AuthorContext)
  if (!id) throw new Error('useAuthorId requires AuthorProvider')
  return id
}
