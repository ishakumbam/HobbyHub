import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { createSeedPosts } from '../data/seedPosts.js'
import { useAuthorId } from './AuthorContext.jsx'

const STORAGE_KEY = 'hobbyhub-posts-v1'

function loadPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.map(normalizePost) : []
  } catch {
    return []
  }
}

function normalizePost(raw) {
  return {
    id: String(raw.id),
    title: String(raw.title ?? ''),
    content: raw.content != null ? String(raw.content) : '',
    imageUrl:
      typeof raw.imageUrl === 'string' && raw.imageUrl.trim()
        ? raw.imageUrl.trim()
        : '',
    createdAt:
      typeof raw.createdAt === 'string'
        ? raw.createdAt
        : new Date().toISOString(),
    upvotes: Number.isFinite(raw.upvotes) ? raw.upvotes : 0,
    authorId: String(raw.authorId ?? ''),
    comments: Array.isArray(raw.comments)
      ? raw.comments.map((c) => ({
          id: String(c.id ?? crypto.randomUUID()),
          text: String(c.text ?? ''),
          createdAt:
            typeof c.createdAt === 'string'
              ? c.createdAt
              : new Date().toISOString(),
        }))
      : [],
  }
}

const PostsContext = createContext(null)

export function PostsProvider({ children }) {
  const authorId = useAuthorId()
  const [posts, setPosts] = useState(loadPosts)

  /** First-time empty board → demo posts with images (assigned to this browser session). */
  useEffect(() => {
    setPosts((prev) => {
      if (prev.length > 0) return prev
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map(normalizePost)
          }
        }
      } catch {
        /* fall through */
      }
      return createSeedPosts(authorId)
    })
  }, [authorId])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    } catch {
      /* quota */
    }
  }, [posts])

  const getPost = useCallback(
    (id) => posts.find((p) => p.id === id) ?? null,
    [posts],
  )

  const createPost = useCallback(({ title, content, imageUrl, authorId }) => {
    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `post-${Date.now()}`
    const post = {
      id,
      title: title.trim(),
      content: (content ?? '').trim(),
      imageUrl: (imageUrl ?? '').trim(),
      createdAt: new Date().toISOString(),
      upvotes: 0,
      authorId,
      comments: [],
    }
    setPosts((prev) => [post, ...prev])
    return id
  }, [])

  const updatePost = useCallback((id, { title, content, imageUrl }) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              title: title.trim(),
              content: (content ?? '').trim(),
              imageUrl: (imageUrl ?? '').trim(),
            }
          : p,
      ),
    )
  }, [])

  const deletePost = useCallback((id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  /** Unlimited upvotes per spec — each click +1 */
  const incrementUpvotes = useCallback((id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p,
      ),
    )
  }, [])

  const addComment = useCallback((postId, text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const comment = {
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `c-${Date.now()}`,
      text: trimmed,
      createdAt: new Date().toISOString(),
    }
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...p.comments, comment] }
          : p,
      ),
    )
  }, [])

  const value = useMemo(
    () => ({
      posts,
      getPost,
      createPost,
      updatePost,
      deletePost,
      incrementUpvotes,
      addComment,
    }),
    [
      posts,
      getPost,
      createPost,
      updatePost,
      deletePost,
      incrementUpvotes,
      addComment,
    ],
  )

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  )
}

export function usePosts() {
  const ctx = useContext(PostsContext)
  if (!ctx) throw new Error('usePosts requires PostsProvider')
  return ctx
}
