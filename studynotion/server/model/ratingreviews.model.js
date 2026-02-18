import mongoose from "mongoose";

const ratingAndReviews = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    rating: {
        type: String,
        required: true
    },
    reviews: {
        type: String
    }
})

const Rating = mongoose.model("Rating", ratingAndReviews);
export default Rating;