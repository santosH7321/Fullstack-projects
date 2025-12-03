const FileModel = require("../model/file.model");

const createFile = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const payload = {
            filename: (file.destination+file.filename),
            type: file.mimetype.split("/")[0],
            size: file.size
        }

        const newFile = await FileModel.create(payload);
        res.status(200).json(newFile);

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const fetchFiles = async (req, res) => {
    try {
        const files = await FileModel.find();
        res.status(200).json(files);
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await FileModel.findByIdAndDelete(id);
        if (!file) {
            return res.status(404).json({
                message: "File not found"
            });
        }
        res.status(200).json({
            message: "File deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
};

module.exports = {
    createFile,
    fetchFiles,
    deleteFile
}