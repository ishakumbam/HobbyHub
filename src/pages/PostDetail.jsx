import { useEffect, useState } from 'react'
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useAuthorId } from '../context/AuthorContext.jsx'
import { usePosts } from '../context/PostsContext.jsx'

function formatWhen(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'full',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

export function PostDetail() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const authorId = useAuthorId()
  const {
    getPost,
    incrementUpvotes,
    addComment,
    deletePost,
  } = usePosts()
  const post = getPost(postId)

  const [commentDraft, setCommentDraft] = useState('')
  const [imgBroken, setImgBroken] = useState(false)

  useEffect(() => {
    setImgBroken(false)
  }, [post?.imageUrl])

  if (!post) {
    return <Navigate to="/" replace />
  }

  const isOwner = post.authorId === authorId

  function handleCommentSubmit(e) {
    e.preventDefault()
    addComment(post.id, commentDraft)
    setCommentDraft('')
  }

  function handleDelete() {
    if (
      typeof window !== 'undefined' &&
      window.confirm('Delete this post permanently?')
    ) {
      deletePost(post.id)
      navigate('/', { replace: true })
    }
  }

  const sortedComments = [...post.comments].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  )

  return (
    <article className="mx-auto max-w-2xl space-y-10">
      <header className="space-y-4 border-b border-md-outline/15 pb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-md-primary hover:underline"
          >
            ← Back to feed
          </Link>
          {isOwner && (
            <div className="flex flex-wrap gap-2">
              <Link
                to={`/posts/${post.id}/edit`}
                className="rounded-full border border-md-outline/30 bg-md-surface-container px-4 py-2 text-sm font-medium text-md-on-surface"
              >
                Edit post
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-900"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-md-on-surface-variant">
          <time dateTime={post.createdAt}>{formatWhen(post.createdAt)}</time>
        </p>
        <h1 className="text-3xl font-medium tracking-tight text-md-on-surface md:text-4xl">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => incrementUpvotes(post.id)}
            className="inline-flex items-center gap-2 rounded-full bg-md-secondary-container px-5 py-2.5 text-sm font-semibold text-md-primary shadow-sm ring-1 ring-md-outline/15 transition hover:bg-md-secondary-container/80"
          >
            <span aria-hidden className="text-lg">
              ▲
            </span>
            Upvote
            <span className="tabular-nums text-md-on-secondary-container">
              ({post.upvotes})
            </span>
          </button>
          <span className="text-sm text-md-on-surface-variant">
            You can tap upvote multiple times — each click adds one.
          </span>
        </div>
      </header>

      {post.imageUrl && !imgBroken && (
        <figure className="overflow-hidden rounded-2xl border border-md-outline/15 bg-md-surface-container shadow-sm">
          <img
            src={post.imageUrl}
            alt=""
            className="max-h-[min(70vh,520px)] w-full object-contain"
            onError={() => setImgBroken(true)}
          />
        </figure>
      )}
      {post.imageUrl && imgBroken && (
        <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-950 ring-1 ring-amber-200">
          Image failed to load. Check the URL or try another link.
        </p>
      )}

      {post.content ? (
        <div className="prose prose-neutral max-w-none">
          <p className="whitespace-pre-wrap text-[1.0625rem] leading-relaxed text-md-on-surface">
            {post.content}
          </p>
        </div>
      ) : (
        <p className="text-md-on-surface-variant italic">
          No additional content for this post.
        </p>
      )}

      <section className="border-t border-md-outline/15 pt-10">
        <h2 className="text-lg font-medium text-md-on-surface">Comments</h2>

        <form onSubmit={handleCommentSubmit} className="mt-4 space-y-3">
          <label htmlFor="comment" className="sr-only">
            Add a comment
          </label>
          <textarea
            id="comment"
            rows={3}
            value={commentDraft}
            onChange={(e) => setCommentDraft(e.target.value)}
            placeholder="Write a comment…"
            className="w-full rounded-xl border border-md-outline/25 bg-md-background px-4 py-3 text-md-on-surface outline-none focus-visible:ring-2 focus-visible:ring-md-primary"
          />
          <button
            type="submit"
            className="rounded-full bg-md-primary px-6 py-2.5 text-sm font-medium text-md-on-primary disabled:opacity-50"
            disabled={!commentDraft.trim()}
          >
            Post comment
          </button>
        </form>

        <ul className="mt-8 space-y-4">
          {sortedComments.length === 0 ? (
            <li className="text-sm text-md-on-surface-variant">
              No comments yet.
            </li>
          ) : (
            sortedComments.map((c) => (
              <li
                key={c.id}
                className="rounded-xl border border-md-outline/12 bg-md-surface-container px-4 py-3"
              >
                <p className="whitespace-pre-wrap text-md-on-surface">
                  {c.text}
                </p>
                <p className="mt-2 text-xs text-md-on-surface-variant">
                  <time dateTime={c.createdAt}>
                    {formatWhen(c.createdAt)}
                  </time>
                </p>
              </li>
            ))
          )}
        </ul>
      </section>
    </article>
  )
}
