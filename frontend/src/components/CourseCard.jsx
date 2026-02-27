import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const CourseCard = ({ course, onDelete, canEdit }) => {
  const { darkMode } = useContext(ThemeContext);
  const title = course.courseName?.trim() || "Untitled course";
  const description = course.courseDescription?.trim()
    ? course.courseDescription
    : "No description yet";

  return (
    <article className="surface-card flex h-full flex-col gap-4 p-6">
      <div>
        <p
          className={`text-xs uppercase tracking-[0.3em] ${darkMode ? "text-slate-400" : "text-slate-500"}`}
        >
          Course
        </p>
        <h3 className={`mt-2 text-xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
          {title}
        </h3>
      </div>
      <p className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
      <div className="mt-auto flex flex-wrap gap-3">
        <Link
          to={`/courses/${course._id}`}
          className={`rounded-full border px-4 py-2 text-sm font-semibold ${
            darkMode
              ? "border-slate-700 text-slate-200 hover:bg-slate-800"
              : "border-slate-300 text-slate-700 hover:bg-slate-100"
          }`}
        >
          View details
        </Link>
        {canEdit && (
          <button
            type="button"
            onClick={() => onDelete(course._id)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${
              darkMode
                ? "border-rose-500/40 text-rose-300"
                : "border-slate-300 text-rose-600 hover:border-rose-500"
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