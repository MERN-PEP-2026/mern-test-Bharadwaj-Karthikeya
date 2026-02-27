const formatDate = (rawDate) => {
  if (!rawDate) return null;
  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const CourseCard = ({ course, onDelete, isEditable }) => {
  const title = course.courseName?.trim() || "Untitled course";
  const description = course.courseDescription?.trim()
    ? course.courseDescription
    : "No description has been added yet. Use the edit actions to craft an overview.";

  const updatedOn = formatDate(course.updatedAt || course.createdAt);
  const courseCode = course._id ? course._id.slice(-6).toUpperCase() : "PENDING";

  return (
    <article className="glass-panel flex h-full flex-col justify-between p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
              {updatedOn ? `Updated ${updatedOn}` : "Active course"}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
            Cohort
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-300">{description}</p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Course ID</p>
          <p className="text-lg font-semibold text-white">{courseCode}</p>
        </div>
        {isEditable && (
          <button
            type="button"
            onClick={() => onDelete?.(course._id)}
            className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-5 py-2 text-sm font-semibold text-rose-200 transition hover:border-rose-400/80 hover:bg-rose-500/20"
          >
            Remove course
          </button>
        )}
      </div>
    </article>
  );
};

export default CourseCard;