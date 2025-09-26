import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [message, setMessage] = useState("Loading...");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/secure/test")
      .then((res) => {
        console.log("✅ API success:", res.data);
        setMessage(res.data);
      })
      .catch((err) => {
        console.error("❌ API error:", err);
        setMessage("Unauthorized");
        logout();
        navigate("/login");
      });
  }, [logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto flex flex-col gap-4 border p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-semibold text-center">Dashboard</h2>

        <p className="text-center text-gray-700">{message}</p>

        <button
          onClick={handleLogout}
          className="border rounded bg-red-500 text-white p-2 hover:bg-red-600 mt-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
