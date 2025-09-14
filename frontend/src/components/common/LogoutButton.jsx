import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useAuthStore from "@/lib/zustand/authStore";

export default function LogoutButton() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
