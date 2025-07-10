import axios from 'axios';

const sendEmail = async (emailData: any) => {
    try {
        const response = await axios.post('/api/send-email', emailData);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
};

export { sendEmail };