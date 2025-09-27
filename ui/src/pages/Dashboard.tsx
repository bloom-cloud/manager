import { useState } from "react";
import api from "../api";
import { useAuth } from "../AuthContext";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post(
        "/user/change-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Failed to change password");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded mb-6"
        onClick={logout}
      >
        Logout
      </button>

      <div className="max-w-md border p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Change Password</h3>
        <form onSubmit={handleChangePassword} className="flex flex-col gap-2">
          <input
            type="password"
            placeholder="Old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Change Password
          </button>
        </form>

        {message && (
          <p
            className={`mt-2 text-sm ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
