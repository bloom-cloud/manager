import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      setMessage("Login successful!");
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      console.error(err);
      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="flex h-screen">
      <form
        onSubmit={handleLogin}
        className="m-auto flex flex-col gap-2 border p-4 rounded-md shadow-md w-80"
      >
        <h3 className="text-lg font-semibold text-center">Login</h3>

        <label>Email</label>
        <input
          className="border p-1 rounded"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          className="border p-1 rounded"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="border rounded bg-blue-500 text-white p-1 hover:bg-blue-600 mt-2"
        >
          Login
        </button>

        {message && (
          <p
            className={`text-center text-sm mt-2 ${
              message.includes("success") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center text-sm mt-2">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}
