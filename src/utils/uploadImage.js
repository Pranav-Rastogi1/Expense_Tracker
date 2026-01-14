import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    // Appending the image file to the form data
    formData.append('image', imageFile);
    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',// Set the content type to multipart/form-data
            },
        });
        return response.data; // Return the response data containing image URL or relevant info
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error; // Rethrow the error for further handling
    }
}

export default uploadImage;