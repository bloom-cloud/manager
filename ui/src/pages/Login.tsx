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

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
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


    <div className="flex items-center gap-2 mt-2">
      <hr className="flex-1 border-gray-300" />
      <span className="text-xs text-gray-500">or</span>
      <hr className="flex-1 border-gray-300" />
    </div>

    <button
      type="button"
      onClick={handleGoogleLogin}
      className="border flex items-center justify-center gap-2 rounded bg-white p-2 hover:bg-gray-100 shadow-sm mt-2"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span>Login with Google</span>
    </button>

      </form>
    </div>
  );
}
