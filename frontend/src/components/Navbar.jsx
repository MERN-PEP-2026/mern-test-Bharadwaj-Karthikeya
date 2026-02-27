import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const navLinks = [
  { to: "/courses", label: "Courses" },
  { to: "/profile", label: "Profile" },
];

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const initials = user?.name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 text-slate-100">
        <Link to="/" className="flex items-center gap-3">
          <span className="rounded-2xl bg-indigo-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
            CF
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-400">CourseFlow</p>
            <p className="text-base font-semibold text-white">Learning Intelligence</p>
          </div>
        </Link>

        {user && (
          <nav className="flex flex-1 justify-center gap-2 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 transition-colors ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-slate-300 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden text-right text-xs sm:block">
                <p className="font-semibold text-white">{user.name}</p>
                <p className="text-slate-400 capitalize">{user.role}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 text-sm font-semibold text-white">
                {initials}
              </div>
              <button
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-2 text-sm font-semibold">
              <Link
                to="/"
                className="rounded-full border border-white/20 px-4 py-2 text-slate-100 transition hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 px-4 py-2 text-white shadow-lg shadow-indigo-500/25"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;