import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
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
    <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr),420px] lg:items-start">
      <div className="glass-panel space-y-6 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-300">
          Welcome Back
        </p>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-white">
            Your course hub in one sleek dashboard
          </h1>
          <p className="text-base text-slate-400">
            Monitor cohorts, launch new learning paths, and collaborate with your team.
          </p>
        </div>
        <ul className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
          {[
            "Live enrollment snapshots",
            "Instructor + admin workbench",
            "Role-aware navigation",
            "Secure session handling",
          ].map((item) => (
            <li key={item} className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-white/90">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="glass-panel p-8">
        <div className="mb-6 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
            Sign In
          </p>
          <h2 className="text-2xl font-semibold text-white">Access your workspace</h2>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-slate-200">
            Email
            <input
              type="email"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
              placeholder="you@academy.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>

          <label className="block text-sm font-semibold text-slate-200">
            Password
            <input
              type="password"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 px-6 py-3 text-base font-semibold text-white shadow-xl shadow-indigo-500/30 transition hover:shadow-indigo-500/50 disabled:opacity-60"
          >
            {isSubmitting ? "Signing you in..." : "Enter dashboard"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Need an account?{" "}
          <Link className="text-sky-300 hover:text-sky-200" to="/register">
            Start here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;