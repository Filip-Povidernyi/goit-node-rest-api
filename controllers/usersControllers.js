import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import ctrlWrapper from "../helpers/ctrlWrappers.js";
import HttpError from "../helpers/HttpErrors.js";
import userServices from "../services/usersServices.js";
import contactsService from "../services/contactsServices.js";
import User from "../db/models/User.js";
import { where } from "sequelize";


const { SECRET_KEY_JWT } = process.env;



const createUser = async (req, res) => {

    const newUser = await userServices.addUser(req.body);
    res.status(201).json(newUser);

};

const loginUser = async (req, res) => {

    const { email, password } = req.body;
    const user = await userServices.findUser({ email });

    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    };

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong")
    };

    const { id } = user;

    const contacts = await contactsService.listContacts({ owner: id });

    const payload = {
        id,
    };

    const token = jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "24h" });
    user.token = token;
    await user.save();

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        },
        contacts
    });

};

const checkCurrent = async (req, res) => {

    const { id, email, subscription } = req.user;
    const contacts = await contactsService.listContacts({ owner: id });

    res.json({
        user: {
            email,
            subscription: subscription
        },
        contacts
    });
};

const userLogout = async (req, res) => {
    const { id } = req.user;

    await User.update(
        { token: null },
        { where: { id, } },
    );

    res.status(204).json();

};

const updSubscription = async (req, res) => {
    const { id } = req.user;
    const { subscription } = req.body;

    await User.update(
        { subscription },
        { where: { id, } },
    );

    const user = await userServices.findUser({ id });

    res.json(user);
}

const userController = {
    createUser: ctrlWrapper(createUser),
    loginUser: ctrlWrapper(loginUser),
    checkCurrent: ctrlWrapper(checkCurrent),
    userLogout: ctrlWrapper(userLogout),
    updSubscription: ctrlWrapper(updSubscription),
};


export default userController;