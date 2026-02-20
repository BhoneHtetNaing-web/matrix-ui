import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const token = localStorage.getItem("token");
  const promoteUser = async (id: string) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/admin/users/${id}/promote`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );

    setUsers(users.map((u) => (u.id === id ? { ...u, role: "admin" } : u)));
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data));
  }, []);

  const deleteUser = async (id: string) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="bg-black p-6 border border-green-400 rounded">
      <h1 className="text-xl mb-4">Admin Panel</h1>

      {users.map((user) => (
        <div
          key={user.id}
          className="flex justify-between border-b border-green-700 py-2"
        >
          <span>
            {user.email} ({user.role})
          </span>
          <button className="text-red-400" onClick={() => deleteUser(user.id)}>
            Delete
          </button>
          <button
            className="text-yellow-400 mr-3"
            onClick={() => promoteUser(user.id)}
          >
            Promote
          </button>
        </div>
      ))}
    </div>
  );
}
