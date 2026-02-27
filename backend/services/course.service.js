import Course from "../models/courses.js";
import User from "../models/users.js";

export const createCourse = async ({ user, body }) => {
  try {
    const existingCourse = await Course.findOne({
      courseName: body.courseName,
    });
    if (existingCourse) {
      throw new Error("Course already exists");
    }
    const instructor = await User.findById(user.userId);
    if (!instructor) {
      throw new Error("Instructor not found");
    }
    const course = await Course.create({ ...body, instructor: instructor._id });
    return course;
  } catch (error) {
    throw error;
  }
};

export const getAllCourses = async () => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    return courses;
  } catch (error) {
    throw error;
  }
};

export const deleteCourse = async (courseId) => {
  try {
    await Course.findByIdAndDelete(courseId);
    return { message: "Course deleted successfully" };
  } catch (error) {
    throw error;
  }
};

export const updateCourse = async ({ courseId, updateData }) => {
  try {
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $set: updateData },
      { new: true },
    );
    if (!course) {
      throw new Error("Course not found");
    }
    return course;
  } catch (error) {
    throw error;
  }
};

export const getCourseDetails = async ({ courseId }) => {
  try {
    const course = await Course.findById(courseId).populate("instructor", "name email");
    if (!course) {
      throw new Error("Course not found");
    }
    return course;
  } catch (error) {
    throw error;
  }
};