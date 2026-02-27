import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const CourseFormModal = ({ initialData, onSubmit, close }) => {
  const [form, setForm] = useState({
    courseName: "",
    courseDescription: "",
  });
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({ courseName: "", courseDescription: "" });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 py-10 ${
        darkMode ? "bg-slate-900/60" : "bg-slate-900/40"
      }`}
    >
      <div className="surface-card w-full max-w-lg p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
            {initialData ? "Edit course" : "Create course"}
          </h2>
          <button
            type="button"
            onClick={close}
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              darkMode
                ? "border-slate-700 text-slate-300"
                : "border-slate-300 text-slate-600"
            }`}
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label
            className={`block text-sm font-medium ${darkMode ? "text-slate-200" : "text-slate-600"}`}
          >
            Course name
            <input
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-base placeholder:text-slate-400 focus:border-slate-900 focus:outline-none ${
                darkMode
                  ? "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
              placeholder="Product Strategy Foundations"
              value={form.courseName}
              onChange={(e) => setForm({ ...form, courseName: e.target.value })}
              required
            />
          </label>

          <label
            className={`block text-sm font-medium ${darkMode ? "text-slate-200" : "text-slate-600"}`}
          >
            Description
            <textarea
              rows={4}
              className={`mt-2 w-full rounded-xl border px-4 py-3 text-base placeholder:text-slate-400 focus:border-slate-900 focus:outline-none ${
                darkMode
                  ? "border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
              placeholder="Share what learners can expect"
              value={form.courseDescription}
              onChange={(e) =>
                setForm({
                  ...form,
                  courseDescription: e.target.value,
                })
              }
              required
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              className={`rounded-xl px-5 py-3 text-sm font-semibold ${
                darkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              {initialData ? "Update course" : "Create course"}
            </button>
            <button
              type="button"
              onClick={close}
              className={`rounded-xl border px-5 py-3 text-sm font-semibold ${
                darkMode
                  ? "border-slate-700 text-slate-200"
                  : "border-slate-300 text-slate-700"
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseFormModal;