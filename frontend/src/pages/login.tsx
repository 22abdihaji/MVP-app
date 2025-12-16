import { useState } from "react";
import api from "../services/api";
import { useRouter } from "next/router";
import { LoginForm } from "../auth/LoginForm";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/signin", { email, password });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", paddingTop: 50 }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", marginBottom: 10 }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
