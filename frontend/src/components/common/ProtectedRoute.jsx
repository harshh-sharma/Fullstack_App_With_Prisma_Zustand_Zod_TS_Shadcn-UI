import { Navigate } from "react-router-dom";
import useAuthStore from "../../lib/zustand/authStore";

export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user } = useAuthStore();

  // Not logged in → redirect to login
  if (!isAuthenticated) return <Navigate to="/login" />;

  // Role check → redirect to dashboard
  if (role && user.role !== role) return <Navigate to="/dashboard" />;

  return children;
}
