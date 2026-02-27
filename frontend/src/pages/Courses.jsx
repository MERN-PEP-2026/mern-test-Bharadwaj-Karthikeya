import {
  getCourses,
  createCourse,
  deleteCourse,
  updateCourse,
} from "../api/course.api";

import { useEffect, useMemo, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import CourseCard from "../components/CourseCard";
import CourseFormModal from "../components/CourseFormModal";
import ConfirmModal from "../components/ConfirmModal";

const Courses = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const userRole = user?.role ?? "member";
  const userId = user?._id ?? user?.id ?? user?.userId ?? null;

  // ------------------------
  // FETCH COURSES
  // ------------------------

  const fetchCourses = async () => {
    const { data } = await getCourses();
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ------------------------
  // PERMISSION CHECKS
  // ------------------------

  const canManageCourse = (course) => {
    if (!user) return false;
    if (userRole === "admin") return true;
    if (userRole === "instructor" && course.instructor?._id === userId) {
      return true;
    }
    return false;
  };

  const canDeleteCourse = (course) => canManageCourse(course);
  const canEditCourse = (course) => canManageCourse(course);

  // ------------------------
  // CREATE
  // ------------------------

  const handleCreateClick = () => {
    setSelectedCourse(null);
    setEditMode(true);
    setShowModal(true);
  };

  const handleCreate = async (form) => {
    await createCourse(form);
    setShowModal(false);
    fetchCourses();
  };

  // ------------------------
  // VIEW
  // ------------------------

  const handleView = (course) => {
    setSelectedCourse(course);
    setEditMode(false);
    setShowModal(true);
  };

  // ------------------------
  // EDIT
  // ------------------------

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = async (form) => {
    await updateCourse(selectedCourse._id, form);
    setShowModal(false);
    setSelectedCourse(null);
    fetchCourses();
  };

  // ------------------------
  // DELETE (WITH CONFIRMATION)
  // ------------------------

  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    await deleteCourse(courseToDelete._id);
    setConfirmOpen(false);
    setCourseToDelete(null);
    fetchCourses();
  };

  const myCourses = useMemo(() => {
    if (!userId) return [];
    return courses.filter((course) => course.instructor?._id === userId);
  }, [courses, userId]);

  const stats = [
    {
      label: `${userRole !== "student" ? "Total courses" : "Available courses"}`,
      value: courses.length,
    },
    {
      label: `${userRole !== "student" ? (userRole === "instructor" ? "My courses" : "Managed courses") : "Registered courses"}`,
      value: myCourses.length,
    },
    { label: "Role", value: userRole },
  ];

  const canCreateCourse = userRole === "admin" || userRole === "instructor";

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
          <h1
            className={`text-3xl font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            Courses
          </h1>
        </div>
        {canCreateCourse && (
          <button
            onClick={handleCreateClick}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              darkMode
                ? "bg-white text-slate-900"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            + Create Course
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
            <p
              className={`mt-3 text-3xl font-semibold capitalize ${darkMode ? "text-white" : "text-slate-900"}`}
            >
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
              onView={handleView}
              onDelete={handleDeleteClick}
              canEdit={canEditCourse(course)}
              canDelete={canDeleteCourse(course)}
            />
          ))}
        </div>
      ) : (
        <div
          className={`surface-card p-12 text-center ${darkMode ? "text-slate-300" : "text-slate-500"}`}
        >
          <p
            className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            No courses yet
          </p>
          <p className="mt-2">
            Create your first curriculum to see it appear here.
          </p>
        </div>
      )}

      {showModal && (
        <CourseFormModal
          initialData={selectedCourse}
          editMode={editMode}
          canEdit={selectedCourse ? canEditCourse(selectedCourse) : true}
          onSubmit={selectedCourse ? handleUpdate : handleCreate}
          onEdit={handleEdit}
          close={() => {
            setShowModal(false);
            setSelectedCourse(null);
          }}
        />
      )}

      {confirmOpen && (
        <ConfirmModal
          title="Delete Course"
          message={`Are you sure you want to delete "${courseToDelete?.courseName}"?`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </section>
  );
};

export default Courses;
