import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    thumbnail: {
        type: String,
        required: true,
        default: ""
    },
    tags: {
        type: String
    },
    benifits: {
        type: String
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    catagory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Catagory"
    },
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    session: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }],
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating"
    }],
    status: {
        type: String,
        enum: ["Draft", "Published"]
    }
}, {timestamps: true});

const Course = mongoose.model("Course", courseSchema);

export default Course;