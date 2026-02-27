import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.api";
import { ThemeContext } from "../context/ThemeContext";

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
  const { darkMode } = useContext(ThemeContext);

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
    <section className="grid gap-12 lg:grid-cols-2">
      <div className="space-y-6">
        <p
          className={`text-sm font-semibold uppercase tracking-[0.3em] ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Onboarding
        </p>
        <div className="space-y-3">
          <h1 className={`text-3xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
            Create your workspace
          </h1>
          <p className={`text-base ${darkMode ? "text-slate-300" : "text-slate-500"}`}>
            Invite your team, assign roles, and keep your catalog organized. Simple defaults make it easy to grow later.
          </p>
        </div>
        <ul className="grid gap-3 text-sm">
          {["Shared roster visibility", "Granular role controls", "Course and cohort snapshots"].map((item) => (
            <li
              key={item}
              className={`surface-card rounded-xl border px-5 py-3 ${
                darkMode ? "border-slate-800/80 text-slate-300" : "border-slate-200/60 text-slate-600"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="surface-card p-8">
        <div className="mb-6 space-y-1">
          <p
            className={`text-sm font-semibold uppercase tracking-[0.2em] ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Create account
          </p>
          <h2 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
            Tell us about you
          </h2>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label
            className={`block text-sm font-medium ${darkMode ? "text-slate-200" : "text-slate-600"}`}
          >
            Full name
            <input
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-base placeholder:text-slate-400 focus:border-slate-900 focus:outline-none ${
                darkMode
                  ? "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
              placeholder="Jordan Martinez"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </label>

          <label
            className={`block text-sm font-medium ${darkMode ? "text-slate-200" : "text-slate-600"}`}
          >
            Work email
            <input
              type="email"
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-base placeholder:text-slate-400 focus:border-slate-900 focus:outline-none ${
                darkMode
                  ? "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
              placeholder="you@company.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
          </label>

          <label
            className={`block text-sm font-medium ${darkMode ? "text-slate-200" : "text-slate-600"}`}
          >
            Password
            <input
              type="password"
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-base placeholder:text-slate-400 focus:border-slate-900 focus:outline-none ${
                darkMode
                  ? "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
              placeholder="Create a strong password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              required
            />
          </label>

          <div className="space-y-3">
            <p className={`text-sm font-semibold ${darkMode ? "text-slate-200" : "text-slate-600"}`}>
              Choose your role
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {roleOptions.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => updateField("role", role.value)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                    form.role === role.value
                      ? darkMode
                        ? "border-white bg-white text-slate-900"
                        : "border-slate-900 bg-slate-900 text-white"
                      : darkMode
                        ? "border-slate-700 bg-slate-900 text-slate-300"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
                  }`}
                >
                  <span className="block text-base font-semibold">{role.label}</span>
                  <span className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>{role.copy}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-xl px-6 py-3 text-base font-semibold transition disabled:opacity-60 ${
              darkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            {isSubmitting ? "Creating profile" : "Create account"}
          </button>
        </form>
        <p
          className={`mt-6 text-center text-sm ${darkMode ? "text-slate-300" : "text-slate-500"}`}
        >
          Already registered? <Link className={darkMode ? "font-semibold text-white" : "font-semibold text-slate-900"} to="/">Sign in</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;