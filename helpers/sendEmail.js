import nodemailer from "nodemailer";
import "dotenv/config";



const {POST_HOST, POST_USER, POST_PASSWORD} = process.env;

const config = {
    host: POST_HOST,
    port: 465,
    secure: true,
    auth: {
        user: POST_USER,
        pass: POST_PASSWORD
    },
};

const transporter = nodemailer.createTransport(config);


const sendEmail = (data) => {
    const email = {...data, from: POST_USER};
    
    return transporter.sendMail(email);
};

export default sendEmail;