import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { getProfile, updateProfile } from "../api/auth.api";

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });

  const roleLabel = useMemo(() => user?.role ?? "member", [user]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setProfile({
          name: data.name,
          email: data.email,
          password: "",
        });
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  const toggleEdit = () => {
    if (editable) {
      // Reset changes if cancel
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

      const updateData = {
        name: profile.name,
      };

      if (profile.password.trim() !== "") {
        updateData.password = profile.password;
      }

      const { data } = await updateProfile(updateData);

      // Update global auth context
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
    <section className="min-h-screen p-8 bg-gray-100 dark:bg-slate-950 transition">

      <div className="grid gap-8 lg:grid-cols-[280px,1fr]">

        {/* LEFT CARD */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-md">

          <div className="flex flex-col items-center gap-4 text-center">

            <div
              className={`flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-semibold ${
                darkMode
                  ? "bg-white text-slate-900"
                  : "bg-slate-900 text-white"
              }`}
            >
              {profile.name?.charAt(0)?.toUpperCase() ?? "?"}
            </div>

            <div>
              <p className="text-lg font-semibold dark:text-white">
                {profile.name}
              </p>

              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                {roleLabel}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm text-slate-500 dark:text-slate-400">

            <div>
              <p className="text-xs uppercase tracking-[0.3em]">
                Email
              </p>
              <p className="text-base dark:text-white">
                {profile.email}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em]">
                Status
              </p>
              <p className="text-base text-emerald-500 dark:text-emerald-400">
                Active
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT FORM CARD */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 p-8 shadow-md">

          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Profile
              </p>
              <h2 className="text-2xl font-semibold dark:text-white">
                Workspace Identity
              </h2>
            </div>

            <button
              onClick={toggleEdit}
              className="rounded-full border px-5 py-2 text-sm font-semibold border-slate-300 dark:border-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {editable ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="space-y-6">

            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-200">
                Full Name
              </label>

              <input
                value={profile.name}
                disabled={!editable}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-200">
                Email
              </label>

              <input
                value={profile.email}
                disabled={!editable}
                className="mt-2 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
              />
            </div>

            {/* PASSWORD */}
            {editable && (
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-200">
                  New Password (optional)
                </label>

                <input
                  type="password"
                  value={profile.password}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border px-4 py-3 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white"
                />
              </div>
            )}

            {/* SAVE BUTTON */}
            <div className="pt-4">
              <button
                disabled={!editable || loading}
                onClick={handleSave}
                className={`w-full rounded-xl px-6 py-3 text-sm font-semibold transition ${
                  darkMode
                    ? "bg-white text-slate-900"
                    : "bg-slate-900 text-white"
                } disabled:opacity-50`}
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