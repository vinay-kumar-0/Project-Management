import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  
  // If there's no token, kick them to login
  if (!token || !userString) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(userString);

  // If they are logged in but don't have the right role for this page, kick them back
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If an employee tries to access manager page, send them to employee dashboard
    return <Navigate to={user.role === 'manager' ? '/manager' : '/employee'} replace />;
  }

  // If they pass the checks, render the child component (the dashboard)
  return <Outlet />;
}