import { ValidationError, ValidationErrorItem } from "sequelize";
import HttpError from "./HttpErrors.js";



const ctrlWrapper = (ctrl) => {

    const func = async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        }
        catch (error) {
            
            if (error?.parent?.code === "23505") {
                return next(HttpError(409, "Email in use"));
            };

            if (error instanceof ValidationError) {
                return next(HttpError(400, error.message));
            };

            if (error.message === "Cannot destructure property 'path' of 'req.file' as it is undefined.") {
                return next(HttpError(401, "Not authorized"))
            }
            next(error);
        };
    };
    
    return func;
};



export default ctrlWrapper