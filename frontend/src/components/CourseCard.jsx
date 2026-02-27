import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const CourseCard = ({ course, onDelete, onView, canEdit, canDelete }) => {
  const { darkMode } = useContext(ThemeContext);
  const title = course.courseName?.trim() || "Untitled course";
  const description = course.courseDescription?.trim()
    ? course.courseDescription
    : "No description yet";
  const instructor = course.instructor?.name ?? "Unknown instructor";

  return (
    <article className="surface-card flex h-full flex-col gap-4 p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className={`text-xs uppercase tracking-[0.3em] ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Course
          </p>
          <h3 className={`mt-2 text-xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
            {title}
          </h3>
        </div>
        {canEdit && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              darkMode
                ? "bg-white/10 text-slate-200"
                : "bg-slate-900/5 text-slate-700"
            }`}
          >
            Managed
          </span>
        )}
      </div>

      <p className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-600"}`}>{description}</p>

      <div className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
        Instructor: {instructor}
      </div>

      <div className="mt-auto flex flex-wrap gap-3">
        <button
          onClick={() => onView(course)}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            darkMode
              ? "bg-white text-slate-900"
              : "bg-slate-900 text-white hover:bg-slate-800"
          }`}
        >
          View details
        </button>

        {canDelete && (
          <button
            onClick={() => onDelete(course)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${
              darkMode
                ? "border-rose-400/50 text-rose-200 hover:bg-rose-500/10"
                : "border-rose-200 text-rose-600 hover:border-rose-500"
            }`}
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
};

export default CourseCard;