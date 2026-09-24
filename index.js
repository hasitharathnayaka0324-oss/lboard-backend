const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const APP_ID = "APP_068389";
const PASSWORD = "ab2536e54d71924985026fcd0697291b";

// Request OTP Endpoint
app.post("/requestOtp", async (req, res) => {
  try {
    const { subscriberId } = req.body;
    if (!subscriberId) {
      return res.status(400).json({ statusCode: "E1000", statusDetail: "Phone number is required" });
    }

    const payload = {
      applicationId: APP_ID,
      password: PASSWORD,
      subscriberId: subscriberId,
      action: "1"
    };

    const response = await axios.post("https://api.ideamart.io/subscription/otp/request", payload, {
      headers: { "Content-Type": "application/json" }
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("OTP Request Error:", error.response ? error.response.data : error.message);
    return res.status(500).json({ statusCode: "E5000", statusDetail: error.message });
  }
});

// Verify OTP Endpoint
app.post("/verifyOtp", async (req, res) => {
  try {
    const { referenceNo, otp } = req.body;
    if (!referenceNo || !otp) {
      return res.status(400).json({ statusCode: "E1000", statusDetail: "referenceNo and otp are required" });
    }

    const payload = {
      applicationId: APP_ID,
      password: PASSWORD,
      referenceNo: referenceNo,
      otp: otp
    };

    const response = await axios.post("https://api.ideamart.io/subscription/otp/verify", payload, {
      headers: { "Content-Type": "application/json" }
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("OTP Verify Error:", error.response ? error.response.data : error.message);
    return res.status(500).json({ statusCode: "E5000", statusDetail: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});