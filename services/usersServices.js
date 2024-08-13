import User from "../db/models/User.js";
import gravatar from "gravatar";
import bcrypt from "bcrypt";



async function addUser(data) {

    const { email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = User.create({
        email,
        password: hashedPassword,
        avatarURL,
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
};

export default userServices;