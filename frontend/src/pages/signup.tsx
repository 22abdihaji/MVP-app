import { useState } from "react";
import api from "../services/api";
import { useRouter } from "next/router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { email, password, name });
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", paddingTop: 50 }}>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
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
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ display: "block", marginBottom: 10 }}
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
