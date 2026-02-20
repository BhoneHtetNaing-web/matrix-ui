import { useEffect, useState } from "react";
import axios from "axios";

export default function Stats() {
  const [stats, setStats] = useState<any>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/dashboard/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setStats(res.data));
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="bg-black p-6 border border-green-400 rounded">
      <h1 className="text-xl mb-4">System Stats</h1>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Admins: {stats.admins}</p>
      <p>Regular Users: {stats.regularUsers}</p>
    </div>
  );
}