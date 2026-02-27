import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data } = await loginUser(form);
      login(data);
      navigate("/courses");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr),380px] lg:items-center">
      <div className="space-y-6">
        <p
          className={`text-sm font-semibold uppercase tracking-[0.3em] ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Dashboard Access
        </p>
        <div className="space-y-3">
          <h1 className={`text-3xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
            Sign in to CourseManager
          </h1>
          <p className={`max-w-lg text-base ${darkMode ? "text-slate-300" : "text-slate-500"}`}>
            Keep tabs on enrollments, maintain your catalog, and pick up where you left off. Designed to stay clean so you can focus.
          </p>
        </div>
        <ul className="grid gap-3 text-sm sm:grid-cols-2">
          {["Role-aware navigation", "Streamlined course controls", "Fast context switching", "Secure sessions"].map(
            (item) => (
              <li
                key={item}
                className={`rounded-xl border px-4 py-3 ${
                  darkMode
                    ? "border-slate-800 bg-slate-900 text-slate-300"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                {item}
              </li>
            ),
          )}
        </ul>
      </div>

      <div className="surface-card p-8">
        <div className="mb-6 space-y-1">
          <p
            className={`text-sm font-semibold uppercase tracking-[0.2em] ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Login
          </p>
          <h2 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>Welcome back</h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label
            className={`block text-sm font-medium ${darkMode ? "text-slate-200" : "text-slate-600"}`}
          >
            Email
            <input
              type="email"
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-base placeholder:text-slate-400  focus:outline-none ${
                darkMode
                  ? "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:border-white-900"
                  : "border-slate-200 bg-white text-slate-900 focus:border-slate-900"
              }`}
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>

          <label
            className={`block text-sm font-medium ${darkMode ? "text-slate-200" : "text-slate-600"}`}
          >
            Password
            <input
              type="password"
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-base placeholder:text-slate-400 focus:outline-none ${
                darkMode
                  ? "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:border-white-900"
                  : "border-slate-200 bg-white text-slate-900 focus:border-slate-900"
              }`}
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-xl px-5 py-3 text-sm font-semibold transition disabled:opacity-60 ${
              darkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            {isSubmitting ? "Signing in" : "Enter dashboard"}
          </button>
        </form>
        <p
          className={`mt-6 text-center text-sm ${darkMode ? "text-slate-300" : "text-slate-500"}`}
        >
          Need an account? <Link className={darkMode ? "font-semibold text-white" : "font-semibold text-slate-900"} to="/register">Create one</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;