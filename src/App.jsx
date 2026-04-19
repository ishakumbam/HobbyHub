import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'
import { Navbar } from './components/Navbar.jsx'
import { AuthorProvider } from './context/AuthorContext.jsx'
import { PostsProvider } from './context/PostsContext.jsx'
import { CreatePost } from './pages/CreatePost.jsx'
import { EditPost } from './pages/EditPost.jsx'
import { HomeFeed } from './pages/HomeFeed.jsx'
import { PostDetail } from './pages/PostDetail.jsx'

function Layout() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 mx-auto min-h-[calc(100vh-5rem)] max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </>
  )
}

export default function App() {
  return (
    <AuthorProvider>
      <PostsProvider>
        <BrowserRouter>
          <div className="relative min-h-screen overflow-x-hidden bg-md-background">
            <div
              className="pointer-events-none fixed inset-0 overflow-hidden"
              aria-hidden
            >
              <div className="absolute -left-24 top-16 h-[28rem] w-[28rem] rounded-[100px] bg-md-primary/[0.12] blur-3xl mix-blend-multiply" />
              <div className="absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-md-secondary-container/40 blur-3xl" />
            </div>
            <div className="relative">
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<HomeFeed />} />
                  <Route path="posts/new" element={<CreatePost />} />
                  <Route path="posts/:postId" element={<PostDetail />} />
                  <Route path="posts/:postId/edit" element={<EditPost />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </PostsProvider>
    </AuthorProvider>
  )
}
