const nodemailer = require('nodemailer');
const { EMAIL, EMAIL_PASSWORD } = process.env;

// **Transporter with Connection Pooling and TLS**
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // or 'STARTTLS'
    service: 'Gmail',
    pool: true, // Enables connection pooling
    maxConnections: 5, // Maximum simultaneous connections
    rateLimit: 10, // Max messages per second
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

// **Send OTP with Error Handling and Logging**
exports.sendOTP = async (email, otp) => {
    const mailOptions = {
        to: email,
        from: EMAIL,
        subject: 'Password Reset OTP',
        text: `Your OTP for resetting your password is: ${otp}. The OTP is valid for 10 minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(`Failed to send OTP to ${email}:`, error);
    }
};
