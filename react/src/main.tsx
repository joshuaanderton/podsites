import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Homepage, Episode, NotFound } from '@/pages'
import { podcastLoader } from '@/use-podcast'
import '@/style.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    loader: podcastLoader,
    errorElement: <NotFound code={500} />
  },
  {
    path: 'episodes/:episodeId',
    element: <Episode />,
    loader: podcastLoader,
    errorElement: <NotFound code={500} />
  },
  {
    path: '*',
    element: <NotFound code={404} />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
