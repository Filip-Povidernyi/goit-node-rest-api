import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import ctrlWrapper from "../helpers/ctrlWrappers.js";
import HttpError from "../helpers/HttpErrors.js";
import userServices from "../services/usersServices.js";


const {SECRET_KEY_JWT} = process.env;



const createUser = async (req, res) => {

    const newUser = await userServices.addUser(req.body);
    res.status(201).json(newUser);

};

const loginUser = async (req, res) => {

    const {email, password} = req.body;
    const user = await userServices.findUser(email);

    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    };

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    };

    const payload = {
        id: user.id
    };

    const token = jwt.sign(payload, SECRET_KEY_JWT, {expiresIn: "24h"});
    user.token = token;
    await user.save();

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    });

};

const userController = {
    createUser: ctrlWrapper(createUser),
    loginUser: ctrlWrapper(loginUser),
};


export default userController;