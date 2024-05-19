import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from './supabase';
import { useAuthStore } from '@store/store.js';

import Layout from '@components/Layout.jsx';
import BoardPage from '@pages/BoardPage.jsx';
import LoginPage from '@pages/LoginPage.jsx';
import SignUpPage from '@pages/SignUpPage.jsx';
import SignUpCompletePage from '@pages/SignUpCompletePage.jsx';
import DashboardPage from '@pages/DashboardPage.jsx';
import NotFoundPage from '@pages/NotFoundPage.jsx';
import CreatePostPage from '@/pages/Post/CreatePostPage.jsx';
import UpdatePostPage from '@/pages/Post/UpdatePostPage.jsx';
import PostPage from '@/pages/Post/PostPage.jsx';

function App() {
  const { setUser, setIsAuthInitialized } = useAuthStore();

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
        if (session?.user) {
          const userData = {
            id: session.user.id,
            nickname: session.user.user_metadata?.nickname,
          };
          setUser(userData);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }

      setIsAuthInitialized(true);
    });
    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Navigate to='/free' replace />,
        },
        {
          path: ':board',
          element: <BoardPage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'signup',
          element: <SignUpPage />,
        },
        {
          path: 'signup-complete',
          element: <SignUpCompletePage />,
        },
        {
          path: ':board/create-post',
          element: <CreatePostPage />,
        },
        {
          path: ':board/:postId',
          element: <PostPage />,
        },
        {
          path: ':board/:postId/update',
          element: <UpdatePostPage />,
        },
        {
          path: '*',
          element: <Navigate to='/404' replace />,
        },
        {
          path: '/404',
          element: <NotFoundPage />,
        },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
