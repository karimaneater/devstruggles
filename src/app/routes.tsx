import { createBrowserRouter, Navigate } from 'react-router';
import { LoginNew } from '@/app/pages/LoginNew';
import { RegisterNew } from '@/app/pages/RegisterNew';
import { HomeNew } from '@/app/pages/HomeNew';
import { PostDetail } from '@/app/pages/PostDetail';
import { CreatePost } from '@/app/pages/CreatePost';
import { UserProfile } from '@/app/pages/UserProfile';
import { Explore } from '@/app/pages/Explore';
import { store } from '@/app/store';

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

// Public Route wrapper (redirect to home if already logged in)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomeNew />
      </ProtectedRoute>
    ),
  },
  {
    path: '/post/:postId',
    element: (
      <ProtectedRoute>
        <PostDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: '/create-post',
    element: (
      <ProtectedRoute>
        <CreatePost />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile/:userId',
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/explore',
    element: (
      <ProtectedRoute>
        <Explore />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginNew />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <RegisterNew />
      </PublicRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
