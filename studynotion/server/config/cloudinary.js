import { v2 as cloudinary} from 'cloudinary';


export const cloudinaryConnect = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        console.log("Cloudinary connected");
    }
    catch (error) {
        console.log(error);
    }
}