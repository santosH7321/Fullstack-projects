import mongoose from "mongoose";

const subSectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    duration: {
        type: String
    }
}, {timestamps: true});


const SubSection = mongoose.model("SubSection", subSectionSchema);

export default SubSection;