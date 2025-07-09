import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = observer(({ children }) => {
  const auth = useAuth();

  return auth.isAuthenticated ? <Navigate to="/" replace /> : children;
});

export default PublicRoute;