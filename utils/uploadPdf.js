// cloudinary.js
import { Cloudinary as CoreCloudinary, Util } from "@cloudinary/url-gen";
import axios from "axios";

const cloudinary = new CoreCloudinary({
    cloud: {
        cloudName: "dbkgkyh4h",
    },
    url: {
        secure: true,
    },
});

const { Image } = cloudinary;
const uploadPreset = "your_upload_preset"; // Set your upload preset

// Function to upload a file to Cloudinary
export const uploadPdf = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    // const response = await fetchWrapper(
    //     `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud.cloudName}/auto/upload`,
    //     {
    //         method: "POST",
    //         body: formData,
    //     }
    // );
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinary.config().cloud.cloudName}/auto/upload`, formData)
    if (response.ok) {
        // const result = await response.json();
        console.log("upload thanh công ");
        return result;
    } else {
        throw new Error("File upload failed");
    }
};
