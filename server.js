const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
const extractUTMParams = (req, res, next) => {
    const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = req.body;

    if (utm_source) {
        req.utm_source = utm_source;
    }
    if (utm_medium) {
        req.utm_medium = utm_medium;
    }
    if (utm_campaign) {
        req.utm_campaign = utm_campaign;
    }
    if (utm_term) {
        req.utm_term = utm_term;
    }
    if (utm_content) {
        req.utm_content = utm_content;
    }

    next();
};
app.post('/api/contact', extractUTMParams, async (req, res) => {
    const { name, phone, email, msg } = req.body;
    const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = req;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tiwarisneha491@gmail.com',
            pass: 'qwpx wgzt yhok gqbq',
        },
    });

    const mailOptions = {
        from: 'tiwarisneha491@gmail.com',
        to: 'tiwarisneha491@gmail.com',
        cc: 'paid@theperfectionist.in',
        subject: 'New Contact Form Submission',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="background-color: #f4f4f4; padding: 10px; border-bottom: 2px solid #e0e0e0;">New Contact Form Submission</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td>Name:</td>
                        <td style="padding: 10px;">${name}</td>
                    </tr>
                    <tr>
                        <td>Phone:</td>
                        <td style="padding: 10px;">${phone}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td style="padding: 10px;">${email}</td>
                    </tr>
                    <tr>
                        <td>Message:</td>
                        <td style="padding: 10px;">${msg}</td>
                    </tr>
                </table>
                <h3>UTM Parameters</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td>UTM Source:</td>
                        <td style="padding: 10px;">${utm_source || 'Not provided'}</td>
                    </tr>
                    <tr>
                        <td>UTM Medium:</td>
                        <td style="padding: 10px;">${utm_medium || 'Not provided'}</td>
                    </tr>
                    <tr>
                        <td>UTM Campaign:</td>
                        <td style="padding: 10px;">${utm_campaign || 'Not provided'}</td>
                    </tr>
                    <tr>
                        <td>UTM Term:</td>
                        <td style="padding: 10px;">${utm_term || 'Not provided'}</td>
                    </tr>
                    <tr>
                        <td>UTM Content:</td>
                        <td style="padding: 10px;">${utm_content || 'Not provided'}</td>
                    </tr>
                </table>
            </div>
        `,
    };
    

try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
} catch (error) {
    console.error('Error sending email', error);
    res.status(500).send('Error sending email');
}
});
app.post('/api/book', async (req, res) => {
    const { fullName, mobileNumber, email, msg } = req.body;
    const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = req;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tiwarisneha491@gmail.com',
            pass: 'qwpx wgzt yhok gqbq',
        },
    });

    const mailOptions = {
        from: 'tiwarisneha491@gmail.com',
        to: 'tiwarisneha491@gmail.com',
        cc: 'paid@theperfectionist.in',
        subject: 'New Appointment Form Submission',
        text: `Full Name: ${fullName}\nMobile Number: ${mobileNumber}\nEmail: ${email}\nmsg: ${msg}\n\n` +
        `UTM Source: ${utm_source || 'Not provided'}\n` +
        `UTM Medium: ${utm_medium || 'Not provided'}\n` +
        `UTM Campaign: ${utm_campaign || 'Not provided'}\n` +
        `UTM Term: ${utm_term || 'Not provided'}\n` +
        `UTM Content: ${utm_content || 'Not provided'}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email', error);
        res.status(500).send('Error sending email');
    }
});
app.post('/api/modal', async (req, res) => {
    const { fullName2, mobileNumber2, email2, msg2 } = req.body;
    const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = req;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tiwarisneha491@gmail.com',
            pass: 'qwpx wgzt yhok gqbq',
        },
    });

    const mailOptions = {
        from: 'tiwarisneha491@gmail.com',
        to: 'tiwarisneha491@gmail.com',
        cc: 'paid@theperfectionist.in',
        subject: 'New Appointment Form Submission',
        text: `Full Name: ${fullName2}\nMobile Number: ${mobileNumber2}\nEmail: ${email2}\nmsg: ${msg2}\n\n` +
        `UTM Source: ${utm_source || 'Not provided'}\n` +
        `UTM Medium: ${utm_medium || 'Not provided'}\n` +
        `UTM Campaign: ${utm_campaign || 'Not provided'}\n` +
        `UTM Term: ${utm_term || 'Not provided'}\n` +
        `UTM Content: ${utm_content || 'Not provided'}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email', error);
        res.status(500).send('Error sending email');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});