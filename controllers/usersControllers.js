import ctrlWrapper from "../helpers/ctrlWrappers.js";
import userServices from "../services/usersServices.js";

const createUser = async (req, res) => {

    const newUser = await userServices.addUser(req.body);
    res.status(201).json(newUser);

};

const userController = {
    createUser: ctrlWrapper(createUser),
};

export default userController;