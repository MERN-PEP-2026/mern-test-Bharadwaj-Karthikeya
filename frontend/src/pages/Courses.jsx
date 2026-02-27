import { useEffect, useState, useContext } from "react";
import { getCourses, createCourse, deleteCourse } from "../api/course.api";
import { AuthContext } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";
import CourseFormModal from "../components/CourseFormModal";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const { data } = await getCourses();
      setCourses(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async (form) => {
    await createCourse(form);
    fetchCourses();
  };

  const handleDelete = async (id) => {
    await deleteCourse(id);
    fetchCourses();
  };

  const canManageCourses = user.role === "admin" || user.role === "instructor";
  const totalCourses = courses.length;
  const highlightCourse = courses[0]?.courseName ?? "Launch your first course";

  return (
    <section className="space-y-10">
      <header className="flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
            Dashboard
          </p>
          <h1 className="text-3xl font-semibold text-white">Learning operations</h1>
          <p className="text-sm text-slate-400">
            Monitor cohorts, curate courses, and keep momentum across your team.
          </p>
        </div>
        {canManageCourses && <CourseFormModal onCreate={handleCreate} />}
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass-panel p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Total courses</p>
          <p className="mt-3 text-4xl font-semibold text-white">{totalCourses}</p>
          <p className="text-sm text-slate-400">Across every learning stream</p>
        </div>
        <div className="glass-panel p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Highlight</p>
          <p className="mt-3 text-xl font-semibold text-white">{highlightCourse}</p>
          <p className="text-sm text-slate-400">Most recent addition</p>
        </div>
        <div className="glass-panel p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Role scope</p>
          <p className="mt-3 text-xl font-semibold capitalize text-white">{user.role}</p>
          <p className="text-sm text-slate-400">Controls tailored to your access</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="glass-panel h-48 animate-pulse" />
          ))}
        </div>
      ) : courses.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onDelete={handleDelete}
              isEditable={canManageCourses}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel flex flex-col items-center gap-4 p-12 text-center">
          <p className="text-lg font-semibold text-white">No courses yet</p>
          <p className="text-sm text-slate-400">
            When you publish a course, it will appear here with key metadata and quick actions.
          </p>
          {canManageCourses && (
            <CourseFormModal onCreate={handleCreate} />
          )}
        </div>
      )}
    </section>
  );
};

export default Courses;