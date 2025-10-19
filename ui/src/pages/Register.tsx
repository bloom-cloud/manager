import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        email,
        password,
      });
      console.log(res.status)
      setMessage("✅ Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    // Redirect user to backend OAuth2 Google endpoint
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="m-auto flex flex-col gap-3 border p-6 rounded-md shadow-md w-80 bg-white"
      >
        <h3 className="text-xl font-semibold text-center">Register</h3>

        <label className="text-sm font-medium">Email</label>
        <input
          className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="text-sm font-medium">Password</label>
        <input
          className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="border rounded bg-blue-500 text-white p-2 hover:bg-blue-600 mt-2 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="flex items-center gap-2 mt-2">
          <hr className="flex-1 border-gray-300" />
          <span className="text-xs text-gray-500">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="border flex items-center justify-center gap-2 rounded bg-white p-2 hover:bg-gray-100 shadow-sm"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Register with Google</span>
        </button>

        {message && (
          <p
            className={`text-center text-sm mt-2 ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center text-sm mt-2">
          Already registered?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
