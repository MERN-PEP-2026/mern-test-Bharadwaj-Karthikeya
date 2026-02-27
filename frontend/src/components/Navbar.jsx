import { Link, NavLink } from "react-router-dom";
import { useContext, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const linkClass = useMemo(
    () =>
      ({ isActive }) => {
        const base = "rounded-full px-3 py-1.5 text-sm font-medium transition";
        if (isActive) {
          return `${base} ${darkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white"}`;
        }
        return `${base} ${darkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`;
      },
    [darkMode],
  );

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur ${darkMode ? "border-slate-800 bg-slate-900/85" : "border-slate-200 bg-white/90"}`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 text-4xl">
        <Link
          to="/"
          className={`text-lg font-semibold tracking-tight mr-10 ${darkMode ? "text-white" : "text-slate-900"}`}
        >
          LearnXpert
        </Link>

          {user && (
            <nav className={`hidden  p-2 rounded-full gap-2 md:flex items-center justify-center ${darkMode ? "bg-slate-800" : "bg-slate-200"}`}>
              <NavLink to="/courses" className={linkClass}>
                Courses
              </NavLink>
              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>
            </nav>
          )}
        <div className="flex items-center gap-3">

          {!user ? (
            <div className="flex items-center gap-2 text-sm font-medium">
              <Link
                className={darkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}
                to="/"
              >
                Login
              </Link>
              <Link
                className={`rounded-full px-4 py-1.5 ${
                  darkMode
                    ? "bg-white text-slate-900 hover:bg-slate-100"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
                to="/register"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* <span className={`text-sm font-medium ${darkMode ? "text-slate-300" : "text-slate-500"}`}>{user.name}</span> */}
              <button
                onClick={logout}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${
                  darkMode
                    ? "border-slate-700 text-slate-200 hover:bg-slate-800"
                    : "border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
              >
                Logout
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            className={`ml-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
              darkMode
                ? "border-slate-700 text-slate-200 hover:bg-slate-800"
                : "border-slate-300 text-slate-700 hover:bg-slate-100"
            }`}
            aria-label="Toggle color theme"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;