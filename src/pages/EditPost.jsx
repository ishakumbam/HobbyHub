import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { PostForm } from '../components/PostForm.jsx'
import { useAuthorId } from '../context/AuthorContext.jsx'
import { usePosts } from '../context/PostsContext.jsx'

export function EditPost() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const authorId = useAuthorId()
  const { getPost, updatePost } = usePosts()
  const post = getPost(postId)

  if (!post) {
    return <Navigate to="/" replace />
  }

  if (post.authorId !== authorId) {
    return <Navigate to={`/posts/${postId}`} replace />
  }

  function handleSubmit(values) {
    updatePost(post.id, values)
    navigate(`/posts/${post.id}`)
  }

  return (
    <PostForm
      key={post.id}
      mode="edit"
      defaultValues={{
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
      }}
      onSubmit={handleSubmit}
      submitLabel="Save changes"
      pending={false}
    />
  )
}
