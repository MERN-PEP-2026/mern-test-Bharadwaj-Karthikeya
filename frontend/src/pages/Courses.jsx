import { useEffect, useState, useContext, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import CourseCard from "../components/CourseCard";
import CourseFormModal from "../components/CourseFormModal";
import { getCourses, createCourse, deleteCourse } from "../api/course.api";

const Courses = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const role = user?.role ?? "student";
  const isAdminOrInstructor = role === "admin" || role === "instructor";
  const userId = user?._id ?? user?.id;

  const myCourses = useMemo(() => {
    if (!userId) return [];
    return courses.filter((c) => c.instructor === userId);
  }, [courses, userId]);

  const fetchCourses = async () => {
    const { data } = await getCourses();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async (form) => {
    await createCourse(form);
    setShowModal(false);
    fetchCourses();
  };

  const handleDelete = async (id) => {
    await deleteCourse(id);
    fetchCourses();
  };

  const stats = [
    { label: "Total courses", value: courses.length },
    { label: "My courses", value: myCourses.length },
    { label: "Role", value: role },
  ];

  return (
    <section className="space-y-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p
            className={`text-sm font-semibold uppercase tracking-[0.2em] ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Catalog
          </p>
          <h1 className={`text-3xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
            Courses
          </h1>
        </div>
        {isAdminOrInstructor && (
          <button
            onClick={() => setShowModal(true)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold ${
              darkMode ? "bg-white text-slate-900" : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            New course
          </button>
        )}
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="surface-card p-6">
            <p
              className={`text-xs uppercase tracking-[0.3em] ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {stat.label}
            </p>
            <p className={`mt-3 text-3xl font-semibold capitalize ${darkMode ? "text-white" : "text-slate-900"}`}>
              {stat.value || 0}
            </p>
          </div>
        ))}
      </div>

      {courses.length ? (
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onDelete={handleDelete}
              canEdit={isAdminOrInstructor}
            />
          ))}
        </div>
      ) : (
        <div className={`surface-card p-12 text-center ${darkMode ? "text-slate-300" : "text-slate-500"}`}>
          <p className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>No courses yet</p>
          <p className="mt-2">Create your first curriculum to see it appear here.</p>
        </div>
      )}

      {isAdminOrInstructor && myCourses.length > 0 && (
        <div className="space-y-4">
          <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>
            My Courses
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {myCourses.map((course) => (
              <CourseCard key={course._id} course={course} onDelete={handleDelete} canEdit />
            ))}
          </div>
        </div>
      )}

      {showModal && <CourseFormModal onSubmit={handleCreate} close={() => setShowModal(false)} />}
    </section>
  );
};

export default Courses;