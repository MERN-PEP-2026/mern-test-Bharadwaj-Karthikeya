import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { getProfile, updateProfile } from "../api/auth.api";

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "", password: "" });

  const roleLabel = useMemo(() => user?.role ?? "member", [user]);

  const labelClass = `block text-sm font-medium ${darkMode ? "text-slate-200" : "text-slate-600"}`;
  const inputClass = `mt-2 w-full rounded-xl border px-4 py-3 text-base placeholder:text-slate-400 focus:outline-none ${
    darkMode
      ? "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500 focus:border-white"
      : "border-slate-200 bg-white text-slate-900 focus:border-slate-900"
  }`;
  const cardTextMuted = darkMode ? "text-slate-400" : "text-slate-500";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setProfile({ name: data.name, email: data.email, password: "" });
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  const toggleEdit = () => {
    if (editable) {
      setProfile({
        name: user?.name ?? "",
        email: user?.email ?? "",
        password: "",
      });
    }
    setEditable((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updateData = { name: profile.name };
      if (profile.password.trim()) {
        updateData.password = profile.password;
      }

      const { data } = await updateProfile(updateData);

      login({
        token: localStorage.getItem("token"),
        user: {
          id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        },
      });

      setEditable(false);
      setProfile((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      console.error("Profile update failed", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`min-h-screen p-8 transition ${
        darkMode ? "text-slate-100" : "text-slate-900"
      }`}
    >
      <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
        <div className="surface-card p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-semibold ${
                darkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white"
              }`}
            >
              {profile.name?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
            <div>
              <p className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
                {profile.name}
              </p>
              <p className={`text-xs uppercase tracking-[0.3em] ${cardTextMuted}`}>
                {roleLabel}
              </p>
            </div>
          </div>
          <div className={`mt-6 space-y-4 text-sm ${cardTextMuted}`}>
            <div>
              <p className="text-xs uppercase tracking-[0.3em]">Email</p>
              <p className={`text-base ${darkMode ? "text-white" : "text-slate-900"}`}>
                {profile.email}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em]">Status</p>
              <p className={`text-base ${darkMode ? "text-emerald-300" : "text-emerald-500"}`}>
                Active
              </p>
            </div>
          </div>
        </div>

        <div className="surface-card p-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className={`text-sm uppercase tracking-[0.2em] ${cardTextMuted}`}>Profile</p>
              <h2 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
                Workspace Identity
              </h2>
            </div>
            <button
              onClick={toggleEdit}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                darkMode
                  ? "border-slate-700 text-slate-200 hover:bg-slate-800"
                  : "border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {editable ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className={labelClass}>Full name</label>
              <input
                value={profile.name}
                disabled={!editable}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input value={profile.email} disabled className={`${inputClass} opacity-80`} />
            </div>

            {editable && (
              <div>
                <label className={labelClass}>New password (optional)</label>
                <input
                  type="password"
                  value={profile.password}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </div>
            )}

            <div className="pt-4">
              <button
                disabled={!editable || loading}
                onClick={handleSave}
                className={`w-full rounded-xl px-6 py-3 text-sm font-semibold transition disabled:opacity-50 ${
                  darkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white"
                }`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;