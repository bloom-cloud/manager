import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        email,
        password,
      });
      setMessage(res.data);
    } catch (err: any) {
      console.error(err);
      setMessage("Registration failed");
    }
  };

  return (
    <div className="flex h-screen">
      <form
        onSubmit={handleRegister}
        className="m-auto flex flex-col gap-2 border p-4 rounded-md shadow-md w-80"
      >
        <h3 className="text-lg font-semibold text-center">Register</h3>

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
          Register
        </button>

        {message && <p className="text-center text-sm mt-2">{message}</p>}

         <p className="text-center text-sm mt-2">
          Already registered?  {" "}
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
