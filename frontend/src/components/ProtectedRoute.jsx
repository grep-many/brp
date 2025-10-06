import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Spinner } from '@/components/ui/spinner';

const ProtectedRoute = ({auth=true}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (auth&&!user) {
    return <Navigate to="/login" replace />;
  }
  if (!auth&&user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
