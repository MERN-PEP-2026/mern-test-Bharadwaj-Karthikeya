import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const [editable, setEditable] = useState(false);
  const [profile, setProfile] = useState(() => ({
    name: user?.name ?? "",
    email: user?.email ?? "",
  }));

  const roleLabel = useMemo(() => user?.role ?? "member", [user]);

  const toggleEdit = () => {
    if (editable) {
      setProfile({ name: user?.name ?? "", email: user?.email ?? "" });
    }
    setEditable((prev) => !prev);
  };

  return (
    <section className="grid gap-8 lg:grid-cols-[280px,1fr]">
      <div className="surface-card p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-semibold ${
              darkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white"
            }`}
          >
            {user?.name?.charAt(0)?.toUpperCase() ?? "?"}
          </div>
          <div>
            <p className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>{user?.name}</p>
            <p
              className={`text-xs font-medium uppercase tracking-[0.3em] ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {roleLabel}
            </p>
          </div>
        </div>
        <dl className={`mt-6 space-y-4 text-sm ${darkMode ? "text-slate-300" : "text-slate-500"}`}>
          <div>
            <dt className="text-xs uppercase tracking-[0.3em]">Email</dt>
            <dd className={`text-base ${darkMode ? "text-white" : "text-slate-900"}`}>{user?.email}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.3em]">Role</dt>
            <dd className={`text-base capitalize ${darkMode ? "text-white" : "text-slate-900"}`}>{roleLabel}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.3em]">Status</dt>
            <dd className={`text-base ${darkMode ? "text-emerald-300" : "text-emerald-500"}`}>Active</dd>
          </div>
        </dl>
      </div>

      <div className="surface-card p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p
              className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Profile
            </p>
            <h2 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
              Workspace identity
            </h2>
          </div>
          <button
            type="button"
            onClick={toggleEdit}
            className={`rounded-full border px-5 py-2 text-sm font-semibold ${
              darkMode
                ? "border-slate-700 text-slate-200 hover:bg-slate-800"
                : "border-slate-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            {editable ? "Cancel" : "Edit"}
          </button>
        </div>

        <form className="space-y-5">
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
              value={profile.name}
              onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
              disabled={!editable}
            />
          </label>

          <label
            className={`block text-sm font-medium ${darkMode ? "text-slate-200" : "text-slate-600"}`}
          >
            Email
            <input
              type="email"
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-base ${
                darkMode
                  ? "border-slate-700 bg-slate-900 text-slate-400"
                  : "border-slate-200 bg-white text-slate-500"
              }`}
              value={profile.email}
              disabled
            />
          </label>

          <div
            className={`rounded-xl border border-dashed px-4 py-4 text-sm ${
              darkMode
                ? "border-slate-700 text-slate-300"
                : "border-slate-200 text-slate-500"
            }`}
          >
            Profile changes will sync in a future release. For now keep details current if you need to send them to support.
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!editable}
              className={`rounded-xl px-6 py-3 text-sm font-semibold disabled:opacity-50 ${
                darkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white"
              }`}
            >
              Save preview
            </button>
            <button
              type="button"
              className={`rounded-xl border px-6 py-3 text-sm font-semibold ${
                darkMode
                  ? "border-slate-700 text-slate-200"
                  : "border-slate-300 text-slate-700"
              }`}
            >
              Export profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;