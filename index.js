const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const APP_ID = "APP_068389";
const APP_PASSWORD = "ab2536e54d71924985026fcd0697291b";

const OTP_REQUEST_URL = "https://api.ideamart.io/subscription/otp/request";
const OTP_VERIFY_URL = "https://api.ideamart.io/subscription/otp/verify";

app.post('/requestOtp', async (req, res) => {
    try {
        const { subscriberId } = req.body;
        
        const response = await axios.post(OTP_REQUEST_URL, {
            applicationId: APP_ID,
            password: APP_PASSWORD,
            subscriberId: subscriberId,
            applicationMetaData: {
                client: "MOBILEAPP",
                device: "ANDROID",
                os: "ANDROID",
                appCode: "https://play.google.com/store/apps/details?id=com.example.l_board"
            }
        });
        
        res.json(response.data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ 
            statusCode: "E1000", 
            statusDetail: error.response ? JSON.stringify(error.response.data) : error.message 
        });
    }
});

app.post('/verifyOtp', async (req, res) => {
    try {
        const { referenceNo, otp } = req.body;
        
        const response = await axios.post(OTP_VERIFY_URL, {
            applicationId: APP_ID,
            password: APP_PASSWORD,
            referenceNo: referenceNo,
            otp: otp
        });
        
        res.json(response.data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ 
            statusCode: "E1000", 
            statusDetail: error.response ? JSON.stringify(error.response.data) : error.message 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
