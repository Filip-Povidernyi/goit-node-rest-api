import Contact from "../db/models/Contact.js";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpErrors.js";
import bcrypt from "bcrypt";

async function addUser(data) {

    const {email, password} = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = User.create({
        email,
        password: hashedPassword,
    });

    return newUser;
};

function findUser(email) {
    return User.findOne({where:{email}});
};

const userServices = {
    addUser,
    findUser,
};

export default userServices;