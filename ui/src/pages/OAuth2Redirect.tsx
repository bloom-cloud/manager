import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function OAuth2Redirect() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const handledRef = useRef(false); // 👈 prevents double execution

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("Token param:", token);

    if (token) {
      login(token);
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [login, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-600">Signing you in...</p>
    </div>
  );
}
