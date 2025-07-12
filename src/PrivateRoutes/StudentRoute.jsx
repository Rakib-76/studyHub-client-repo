import { Navigate } from 'react-router';
import UseUserRole from '../hooks/UseUserRole';

const StudentRoute = ({ children }) => {
  const { role, loading } = UseUserRole();

  if (loading) return <p>Checking role...</p>;

  return role === 'student' ? children : <Navigate to="/" />;
};

export default StudentRoute;
