import { useState } from 'react'
import { Link } from 'react-router-dom'

const initialState = {
  title: '',
  content: '',
  imageUrl: '',
}

export function PostForm({
  mode,
  defaultValues,
  onSubmit,
  submitLabel,
  pending,
}) {
  const [fields, setFields] = useState(() => ({
    ...initialState,
    ...defaultValues,
  }))
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const title = fields.title.trim()
    if (!title) {
      setError('Title is required.')
      return
    }
    setError('')
    onSubmit({
      title,
      content: fields.content,
      imageUrl: fields.imageUrl,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl space-y-6 rounded-3xl border border-md-outline/15 bg-md-surface-container p-6 shadow-sm sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-medium text-md-on-surface">
          {mode === 'create' ? 'Create a new post' : 'Edit post'}
        </h1>
        <Link
          to="/"
          className="text-sm font-medium text-md-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2"
        >
          Cancel
        </Link>
      </div>

      <div>
        <label
          htmlFor="post-title"
          className="mb-1.5 block text-sm font-medium text-md-on-surface-variant"
        >
          Title <span className="text-red-700">*</span>
        </label>
        <input
          id="post-title"
          type="text"
          required
          value={fields.title}
          onChange={(e) =>
            setFields((f) => ({ ...f, title: e.target.value }))
          }
          className="h-12 w-full rounded-xl border border-md-outline/25 bg-md-background px-4 text-md-on-surface outline-none ring-md-primary focus-visible:ring-2"
          placeholder="What’s this about?"
        />
      </div>

      <div>
        <label
          htmlFor="post-content"
          className="mb-1.5 block text-sm font-medium text-md-on-surface-variant"
        >
          Additional content{' '}
          <span className="font-normal text-md-on-surface-variant/70">
            (optional)
          </span>
        </label>
        <textarea
          id="post-content"
          rows={6}
          value={fields.content}
          onChange={(e) =>
            setFields((f) => ({ ...f, content: e.target.value }))
          }
          className="w-full rounded-xl border border-md-outline/25 bg-md-background px-4 py-3 text-md-on-surface outline-none focus-visible:ring-2 focus-visible:ring-md-primary"
          placeholder="Body text, notes, links…"
        />
      </div>

      <div>
        <label
          htmlFor="post-image"
          className="mb-1.5 block text-sm font-medium text-md-on-surface-variant"
        >
          Image URL{' '}
          <span className="font-normal text-md-on-surface-variant/70">
            (optional)
          </span>
        </label>
        <input
          id="post-image"
          type="url"
          inputMode="url"
          value={fields.imageUrl}
          onChange={(e) =>
            setFields((f) => ({ ...f, imageUrl: e.target.value }))
          }
          className="h-12 w-full rounded-xl border border-md-outline/25 bg-md-background px-4 text-md-on-surface outline-none focus-visible:ring-2 focus-visible:ring-md-primary"
          placeholder="https://…"
        />
        <p className="mt-1.5 text-xs text-md-on-surface-variant">
          Paste a direct link to an image hosted elsewhere.
        </p>
      </div>

      {error && (
        <p className="text-sm font-medium text-red-800" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-md-primary px-8 py-2.5 text-sm font-medium text-md-on-primary shadow-sm transition-opacity disabled:opacity-60"
        >
          {pending ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  )
}
