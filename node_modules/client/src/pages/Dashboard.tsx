import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage("Unauthorized"));
  }, []);

  return (
    <div className="bg-black p-10 rounded-md border border-green-400">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>{message}</p>
      <button
        className="mt-4 bg-green-400 text-black px-4 py-2 rounded"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}