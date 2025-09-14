import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-lg w-full text-center p-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome to Task Manager</CardTitle>
        </CardHeader>
        <CardContent className="mt-4 space-y-6">
          <p className="text-gray-600">
            Manage your tasks, track payments, and stay productive. Login or register to get started!
          </p>

          <div className="flex justify-center gap-4">
            <Button variant="default" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="outline" onClick={() => navigate("/register")}>
              Register
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
