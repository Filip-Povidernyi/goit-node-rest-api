import gravatar from "gravatar";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import "dotenv/config";

import User from "../db/models/User.js";
import sendEmail from "../helpers/sendEmail.js";



const {BASE_URL} = process.env;

const sendVerifyEmail = (verificationToken, email) => {

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Click for verify e-mail</a>`
    };

    return sendEmail(verifyEmail);

};

async function addUser(data) {

    const { email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    await sendVerifyEmail(verificationToken, email);
    
    const newUser = User.create({
        ...data,
        password: hashedPassword,
        avatarURL,
        verificationToken,
    });

    return newUser;
};


function findUser(data) {
    return User.findOne({ where: data });
};

function updateUser(id, data) {

    return User.update(
        data,
        {where: id}
    );
};

const userServices = {
    addUser,
    findUser,
    updateUser,
    sendVerifyEmail,
};

export default userServices;