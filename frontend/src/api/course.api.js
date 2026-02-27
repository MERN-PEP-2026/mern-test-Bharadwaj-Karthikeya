import API from "./axios";

export const getCourses = () => API.get("/courses");
export const createCourse = (data) => API.post("/courses", data);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);