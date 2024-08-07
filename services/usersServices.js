import Contact from "../db/models/Contact.js";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpErrors.js";
import bcrypt from "bcrypt";

async function addUser(data) {

    const {email, password} = data;

    const existUser = await Contact.findOne({where: {email}});
    
    if (existUser) {
        throw HttpError(409, "Email in use");
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = User.create({
        email,
        password: hashedPassword,
    });

    return newUser;
};

const userServices = {
    addUser,
};

export default userServices;