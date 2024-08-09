import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpErrors.js";
import userServices from "../services/usersServices.js";



const {SECRET_KEY_JWT} = process.env;

const authenticate = async (req, res, next) => {

    const {authorization} = req.headers;

    if (!authorization) {
        return next(HttpError(401, "Not authorized"));
    };

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
        return next(HttpError(401, "Bearer missing"));
    };
    try {
        const {id} = jwt.verify(token, SECRET_KEY_JWT);
        const user = await userServices.findUser({id});
        if (!user) {
            return next(HttpError(401, "User not found"))
        }
        req.user = user;
    } catch(error) {
        next(HttpError(401, error.message));
    };

};

export default authenticate;