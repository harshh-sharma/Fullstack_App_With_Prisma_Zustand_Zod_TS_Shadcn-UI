import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

// Pages
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
// import Dashboard from "../features/tasks/pages/Dashboard";
// import AdminDashboard from "../features/admin/pages/AdminDashboard";
// import NotFound from "../pages/NotFound";
import Home from "../pages/Home"
import UserDashboardContent from "@/features/tasks/components/UserDashboard";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";

export default function AppRoutes() {
  return (
    // <Router>
      <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboardContent/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard/>
            </ProtectedRoute>
          }
        />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    // </Router>
  );
}
