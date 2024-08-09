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

function findUser(data) {
    return User.findOne({where: data});
};

const userServices = {
    addUser,
    findUser,
};

export default userServices;