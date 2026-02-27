import {
    createCourse,
    getAllCourses,
    deleteCourse,
    updateCourse,
    getCourseDetails
} from "../services/course.service.js";

export const createCourseController = async (req, res) => {
    try {
        const course = await createCourse(req);
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllCoursesController = async (req, res) => {
    try {
        const courses = await getAllCourses();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCourseController = async (req, res) => {
    try {
        const result = await deleteCourse(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCourseDetailsController = async (req, res) => {
  try {
    const course = await getCourseDetails(req.params);
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCourseController = async (req, res) => {
  try {
    const course = await updateCourse({ courseId: req.params.id, updateData: req.body });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};