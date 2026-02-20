import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MatrixBackground from "./components/MatrixBackground";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-green-400 font-mono">
      {/* Matrix Background Animation */}
      <MatrixBackground />

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </div>
  );
}