import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseDescription: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},{ timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;