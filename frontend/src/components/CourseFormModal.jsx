import { useState } from "react";

const defaultForm = {
  courseName: "",
  courseDescription: "",
};

const CourseFormModal = ({ onCreate }) => {
  const [form, setForm] = useState(defaultForm);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.courseName.trim()) return;
    setIsSubmitting(true);
    try {
      await onCreate(form);
      setForm(defaultForm);
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:shadow-indigo-500/40"
      >
        New course
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-10">
          <div className="glass-panel relative w-full max-w-xl p-8">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-slate-200"
            >
              Close
            </button>
            <div className="mb-6 space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                Create course
              </p>
              <h3 className="text-2xl font-semibold text-white">Bring a new cohort to life</h3>
              <p className="text-sm text-slate-400">
                Draft a title and a concise description. You can enrich the syllabus later on.
              </p>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block text-sm font-semibold text-slate-200">
                Course name
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                  placeholder="Product Strategy Foundations"
                  value={form.courseName}
                  onChange={(e) => setForm((prev) => ({ ...prev, courseName: e.target.value }))}
                  required
                />
              </label>

              <label className="block text-sm font-semibold text-slate-200">
                Description
                <textarea
                  rows={4}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                  placeholder="Outline the outcomes, modules, or live touchpoints learners can expect."
                  value={form.courseDescription}
                  onChange={(e) => setForm((prev) => ({ ...prev, courseDescription: e.target.value }))}
                  required
                />
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-2xl bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-500/30 disabled:opacity-60"
                >
                  {isSubmitting ? "Publishing..." : "Publish course"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-slate-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseFormModal;