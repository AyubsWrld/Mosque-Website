const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config({ path: './.env' }); // how stupid is this tho lol 

// ------------------------------ Remove during production just for debugging ----------------

// console.log('EMAIL_USER:', process.env.EMAIL);
// console.log('EMAIL_PASSWORD:', process.env.PASSWORD);


// ------------------------------ Remove during production just for debugging ----------------

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Add CORS middleware

const requiredEnvVars = ['EMAIL', 'PASSWORD'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:', missingEnvVars);
    process.exit(1);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

transporter.verify(function(error, success) {
    if (error) {
        console.error('Transporter verification failed:', error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

app.post('/api/send-email', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                error: 'All fields are required',
                missing: Object.entries({ name, email, subject, message })
                    .filter(([_, value]) => !value)
                    .map(([key]) => key)
            });
        }

        const mailOptions = {
            from: process.env.EMAIL,
            to: 'info@sahabamosque.com',
            subject: `New Contact Form Message: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <h3>Message:</h3>
                <p>${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            error: 'Failed to send email',
            details: error.message
        });
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
