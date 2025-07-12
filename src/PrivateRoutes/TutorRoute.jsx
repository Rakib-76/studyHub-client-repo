// src/PrivateRoutes/TutorRoute.jsx
import { Navigate } from 'react-router';
import UseUserRole from '../hooks/UseUserRole';

const TutorRoute = ({ children }) => {
  const { role, loading } = UseUserRole();

  if (loading) return <p>Checking role...</p>;

  return role === 'tutor' ? children : <Navigate to="/" />;
};

export default TutorRoute;
