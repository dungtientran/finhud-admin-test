import { message } from 'antd';
import axios from 'axios';

export const uploadImageToS3 = async (code, files) => {
    let IMAGE_BUCKET = 'finhub172520-dev';

    try {
        const payload = {
            Bucket: `${IMAGE_BUCKET}/${code}`,
            Key: files.name,
            ContentType: files.type,
        };

        // const getUrlSeverS3 = await axios.post('https://35j85drxff.execute-api.ap-southeast-1.amazonaws.com/dev/utils/get_pre_signed_url_put', payload)

        // console.log('getUrlSeverS3______________________________________', getUrlSeverS3);

        // const urlS3 = getUrlSeverS3?.url;

        // const options = {
        //     headers: {
        //         'Content-Type': files.type,
        //     },
        // };

        // await axios.put(urlS3, files, options);

        // const imageUrl = await getUrlImage(payload);

        // return imageUrl?.url;
    } catch (error) {
        console.log(error);
        message.error(`${error?.message}` || 'Upload thất bại');

        return false;
    }
};
