import React, { useState } from 'react';
import styles from './style.module.css';
import { Upload } from 'antd';
// import { Cloudinary } from 'cloudinary-core';
import { Cloudinary } from "@cloudinary/url-gen";
import { uploadPdf } from '@/utils/uploadPdf';
import axios from 'axios';

const cloudinary = new Cloudinary({
    cloud_name: 'dbkgkyh4h',
    api_key: '296266639773126',
    api_secret: 'gdi_4hyKPoVLFMrsqw9gPxodv_g',
});

const FileUpLoad = ({ files, setFiles }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const cld = new Cloudinary({ cloud: { cloudName: 'dbkgkyh4h' } });

    console.log("cld__________________________", cld.getConfig());

    const handleUpload = async (e) => {

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        // formData.append("upload_preset", "qfxfgji7");
        setFiles(file.name)

    }
    return (
        <div className={styles.btn_upload_docCCQ}>
            <label htmlFor="uploadDocCCQ">Tải lên</label>
            <input
                type="file"
                id='uploadDocCCQ'
                accept='.pdf'
                name='uploadDocCCQ'
                onChange={handleUpload}
            />
        </div>
    )
}

export default FileUpLoad
