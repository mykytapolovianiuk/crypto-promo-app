import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = observer(({ children }) => {
  const auth = useAuth();

  return auth.isAuthenticated ? children : <Navigate to="/auth" replace />;
});

export default PrivateRoute;