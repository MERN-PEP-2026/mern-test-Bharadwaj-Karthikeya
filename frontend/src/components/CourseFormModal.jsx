import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const CourseFormModal = ({
  initialData,
  editMode,
  onSubmit,
  onEdit,
  canEdit,
  close,
}) => {
  const [form, setForm] = useState({
    courseName: "",
    courseDescription: "",
  });
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (initialData) {
      setForm({
        courseName: initialData.courseName ?? "",
        courseDescription: initialData.courseDescription ?? "",
      });
    } else {
      setForm({ courseName: "", courseDescription: "" });
    }
  }, [initialData]);

  const isViewMode = Boolean(initialData) && !editMode;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isViewMode) return;
    onSubmit(form);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 py-10 ${
        darkMode ? "bg-slate-900/70" : "bg-slate-900/40"
      }`}
    >
      <div className="surface-card w-full max-w-lg p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p
              className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {initialData ? (isViewMode ? "Course" : "Editing") : "Create"}
            </p>
            <h2 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
              {initialData
                ? editMode
                  ? "Edit course"
                  : "Course details"
                : "Create course"}
            </h2>
          </div>
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
          {initialData && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                darkMode
                  ? "border-slate-700 text-slate-300"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              Instructor: {initialData.instructor?.name ?? "Unknown"}
            </div>
          )}

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
              value={form.courseName}
              disabled={isViewMode}
              onChange={(e) => setForm({ ...form, courseName: e.target.value })}
              placeholder="Product Strategy Foundations"
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
              value={form.courseDescription}
              disabled={isViewMode}
              onChange={(e) =>
                setForm({
                  ...form,
                  courseDescription: e.target.value,
                })
              }
              placeholder="Share what learners can expect"
              required
            />
          </label>

          <div className="flex flex-wrap gap-3">
            {isViewMode && canEdit && (
              <button
                type="button"
                onClick={onEdit}
                className={`rounded-xl border px-5 py-3 text-sm font-semibold ${
                  darkMode
                    ? "border-slate-600 text-slate-200"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Edit course
              </button>
            )}

            {!isViewMode && (
              <button
                className={`rounded-xl px-5 py-3 text-sm font-semibold ${
                  darkMode
                    ? "bg-white text-slate-900"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {initialData ? "Save changes" : "Create course"}
              </button>
            )}

            <button
              type="button"
              onClick={close}
              className={`rounded-xl border px-5 py-3 text-sm font-semibold ${
                darkMode
                  ? "border-slate-700 text-slate-200"
                  : "border-slate-300 text-slate-700"
              }`}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseFormModal;
