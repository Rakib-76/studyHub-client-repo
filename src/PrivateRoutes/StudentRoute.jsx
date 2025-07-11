// src/PrivateRoutes/StudentRoute.jsx
import { Navigate } from 'react-router';
import UseUserRole from '../hooks/UseUserRole';


const StudentRoute = ({ children }) => {
  const role = UseUserRole();

  if (role === null) return <p>Checking role...</p>;
  return role === 'student' ? children : <Navigate to="/" />;
};

export default StudentRoute;
