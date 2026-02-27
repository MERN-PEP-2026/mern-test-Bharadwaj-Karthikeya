import "dotenv/config";

import connectDB from "./config/db.js";
import Course from "./models/courses.js";

const seedCourses = async () => {
  try {
    await connectDB();
    const courses = [
      {
        courseName: "Introduction to Programming",
        courseDescription: "Learn the basics of programming using Python.",
        instructor: "69a13621b95cef83f72a0bd2", // Replace with actual instructor ID
      },
        {
        courseName: "Web Development with React",
        courseDescription: "Build modern web applications using React.",
        instructor: "69a13621b95cef83f72a0bd2", // Replace with actual instructor ID
        },
        {
        courseName: "Data Structures and Algorithms",
        courseDescription: "Master essential data structures and algorithms for coding interviews.",
        instructor: "69a13621b95cef83f72a0bd2", // Replace with actual instructor ID
        },
    ];
    await Course.insertMany(courses);
    console.log("Courses seeded successfully");
    process.exit(0);
  }
    catch (error) {
        console.error("Error seeding courses:", error.message);
        process.exit(1);
    }
};

seedCourses();