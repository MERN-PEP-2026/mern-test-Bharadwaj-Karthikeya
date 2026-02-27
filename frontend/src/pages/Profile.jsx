import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
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
    <section className="grid gap-8 lg:grid-cols-[320px,1fr]">
      <div className="glass-panel space-y-6 p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 via-sky-400 to-emerald-300 text-3xl font-semibold text-white">
            {user?.name?.charAt(0)?.toUpperCase() ?? "?"}
          </div>
          <div>
            <p className="text-xl font-semibold text-white">{user?.name}</p>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{roleLabel}</p>
          </div>
        </div>
        <div className="space-y-4 text-sm text-slate-300">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Email</p>
            <p className="text-base text-white">{user?.email}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Role focus</p>
            <p className="text-base capitalize text-white">{roleLabel}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Status</p>
            <p className="text-base text-emerald-300">Verified - Active</p>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Profile</p>
            <h2 className="text-2xl font-semibold text-white">Workspace identity</h2>
          </div>
          <button
            type="button"
            onClick={toggleEdit}
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
          >
            {editable ? "Cancel" : "Edit"}
          </button>
        </div>

        <form className="space-y-5">
          <label className="block text-sm font-semibold text-slate-200">
            Full name
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
              value={profile.name}
              onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
              disabled={!editable}
            />
          </label>

          <label className="block text-sm font-semibold text-slate-200">
            Email
            <input
              type="email"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
              value={profile.email}
              disabled
            />
          </label>

          <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-4 text-sm text-slate-400">
            Profile edits sync in the upcoming release. For now, you can preview formatting and copy to share with support.
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!editable}
              className="rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 disabled:opacity-50"
            >
              Save preview
            </button>
            <button
              type="button"
              className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200"
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