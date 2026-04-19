import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePosts } from '../context/PostsContext.jsx'

function formatWhen(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

export function HomeFeed() {
  const { posts } = usePosts()
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('created') // created | upvotes

  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = posts.filter((p) =>
      q ? p.title.toLowerCase().includes(q) : true,
    )
    list = [...list].sort((a, b) => {
      if (sortBy === 'upvotes') {
        if (b.upvotes !== a.upvotes) return b.upvotes - a.upvotes
      }
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    return list
  }, [posts, query, sortBy])

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-md-on-surface md:text-3xl">
            Feed
          </h1>
          <p className="mt-1 text-sm text-md-on-surface-variant">
            Browse posts — click a row for the full page.
          </p>
        </div>
        <Link
          to="/posts/new"
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-md-primary px-6 py-2.5 text-sm font-medium text-md-on-primary shadow-sm"
        >
          New post
        </Link>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
          <span className="font-medium text-md-on-surface-variant">
            Search by title
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter…"
            className="h-11 rounded-xl border border-md-outline/25 bg-md-background px-4 text-md-on-surface outline-none focus-visible:ring-2 focus-visible:ring-md-primary"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm sm:w-48">
          <span className="font-medium text-md-on-surface-variant">Sort</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-11 rounded-xl border border-md-outline/25 bg-md-background px-3 text-md-on-surface outline-none focus-visible:ring-2 focus-visible:ring-md-primary"
          >
            <option value="created">Creation time (newest)</option>
            <option value="upvotes">Upvotes (highest)</option>
          </select>
        </label>
      </div>

      {filteredSorted.length === 0 ? (
        <p className="rounded-2xl border border-md-outline/15 bg-md-surface-container px-6 py-14 text-center text-md-on-surface-variant">
          {posts.length === 0
            ? 'No posts yet — create the first one.'
            : 'No posts match your search.'}
        </p>
      ) : (
        <ul className="divide-y divide-md-outline/15 rounded-2xl border border-md-outline/15 bg-md-background shadow-sm">
          {filteredSorted.map((post) => (
            <li key={post.id}>
              <Link
                to={`/posts/${post.id}`}
                className="flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-md-surface-container/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-md-primary sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.8125rem] text-md-on-surface-variant">
                    <time dateTime={post.createdAt}>
                      {formatWhen(post.createdAt)}
                    </time>
                  </p>
                  <h2 className="mt-0.5 truncate text-lg font-medium text-md-on-surface">
                    {post.title}
                  </h2>
                </div>
                <div className="shrink-0 text-sm tabular-nums text-md-primary sm:text-right">
                  <span className="font-semibold">{post.upvotes}</span>{' '}
                  <span className="text-md-on-surface-variant">upvotes</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
