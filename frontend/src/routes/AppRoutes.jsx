import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Courses from "../pages/Courses";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";

export const AppRoutes = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen bg-transparent ${darkMode ? "text-slate-100" : "text-slate-900"}`}
    >
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/courses"
          element={
            <ProtectedRoute user={user}>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          }
        />
        </Routes>
      </main>
    </div>
  );
};

export default AppRoutes;
