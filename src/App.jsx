import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from '@components/Layout.jsx';
import BoardPage from '@pages/BoardPage.jsx';
import LoginPage from '@pages/LoginPage.jsx';
import SignUpPage from '@pages/SignUpPage.jsx';
import SignUpCompletePage from '@pages/SignUpCompletePage.jsx';
import DashboardPage from '@pages/DashboardPage.jsx';
import NotFoundPage from '@pages/NotFoundPage.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
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
          path: '*',
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
