import HttpError from "./HttpErrors.js";

const checkBody = (req, res, next) => {
    const data = req.body;
    if (Object.keys(data).length === 0) {
        throw HttpError(400, "Body must have at least one field")
    };
    next();
};

export default checkBody;