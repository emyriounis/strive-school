import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'


const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET, CLOUDINARY_URL } =
process.env;
cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET,
    api_url: CLOUDINARY_URL,
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "pPicture"
    }

})

export const postPicture = multer({ storage }).single("pPicture");