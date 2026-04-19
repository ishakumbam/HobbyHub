import { useNavigate } from 'react-router-dom'
import { PostForm } from '../components/PostForm.jsx'
import { useAuthorId } from '../context/AuthorContext.jsx'
import { usePosts } from '../context/PostsContext.jsx'

export function CreatePost() {
  const navigate = useNavigate()
  const authorId = useAuthorId()
  const { createPost } = usePosts()

  function handleSubmit(values) {
    const id = createPost({ ...values, authorId })
    navigate(`/posts/${id}`)
  }

  return (
    <PostForm
      mode="create"
      defaultValues={{ title: '', content: '', imageUrl: '' }}
      onSubmit={handleSubmit}
      submitLabel="Publish post"
      pending={false}
    />
  )
}
