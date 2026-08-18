import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If no user is logged in, redirect to login page
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // If the user is logged in but doesn't have an admin role, redirect to home
  if (user.role !== 'super_admin' && user.role !== 'organizer') {
    return <Navigate to="/" replace />;
  }

  return children;
}
