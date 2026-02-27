import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.api";

const roleOptions = [
  { value: "student", label: "Learner", copy: "Track assigned paths" },
  { value: "instructor", label: "Instructor", copy: "Launch new cohorts" },
  { value: "admin", label: "Admin", copy: "Orchestrate org-wide" },
];

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await registerUser(form);
      navigate("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <section className="grid gap-10 lg:grid-cols-2">
      <div className="glass-panel space-y-6 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
          Onboarding
        </p>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-white">Spin up your CourseFlow workspace</h1>
          <p className="text-base text-slate-400">
            Invite your team, define roles, and unlock a focused dashboard tailored to what you need to build or learn.
          </p>
        </div>
        <div className="grid gap-4 text-sm text-slate-300">
          {[
            "Unified roster for every cohort",
            "Role-based authoring permissions",
            "Live analytics tiles ready on day one",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-white/90">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel p-8">
        <div className="mb-6 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Create account
          </p>
          <h2 className="text-2xl font-semibold text-white">Tell us about you</h2>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-slate-200">
            Full name
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
              placeholder="Jordan Martinez"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </label>

          <label className="block text-sm font-semibold text-slate-200">
            Work email
            <input
              type="email"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
              placeholder="you@courseflow.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
          </label>

          <label className="block text-sm font-semibold text-slate-200">
            Password
            <input
              type="password"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
              placeholder="Create a strong password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              required
            />
          </label>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-200">Choose your role</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {roleOptions.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => updateField("role", role.value)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                    form.role === role.value
                      ? "border-sky-400 bg-sky-400/10 text-white"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/30"
                  }`}
                >
                  <span className="block text-base text-white">{role.label}</span>
                  <span className="text-xs font-normal text-slate-400">{role.copy}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-500 px-6 py-3 text-base font-semibold text-white shadow-xl shadow-emerald-500/25 transition hover:shadow-indigo-500/40 disabled:opacity-60"
          >
            {isSubmitting ? "Creating profile..." : "Launch workspace"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Already registered?{" "}
          <Link className="text-sky-300 hover:text-sky-200" to="/">
            Sign in here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;