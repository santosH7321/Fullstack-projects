import mongoose from "mongoose";

const catagorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
}, 
{timestamps: true}
);

const Catagory = mongoose.model("Catagory", catagorySchema);

export default Catagory;