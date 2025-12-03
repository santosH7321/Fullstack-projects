const {Schema, model} = require("mongoose")

const fileSchema = new Schema({
    fileName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    type: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    size: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const FileModel = model("File", fileSchema);
module.exports = FileModel;