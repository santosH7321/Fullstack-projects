import {v2 as cloudinary} from 'cloudinary';

export const uploadToCloudinary = async (file, folder, width, height) => {
    try {
        const options = {
            folder: folder
        }

        if(width) {
            options.width = width;
        }
        if(height) {
            options.height = height;
        }
        options.resource_type = 'auto';

        return await cloudinary.uploader.upload(file.tempFilePath, options);
    }
    catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
}