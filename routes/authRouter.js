import express from "express";
import validateBody from "../helpers/validateBody.js";
import { createUserSchema, updSubscriptionSchema } from "../schemas/usersSchemas.js";
import userController from "../controllers/usersControllers.js";
import authenticate from "../middlewarws/authenticate.js";



const authRouter = express.Router();

authRouter.post("/register", validateBody(createUserSchema), userController.createUser);

authRouter.post("/login", validateBody(createUserSchema), userController.loginUser);

authRouter.post("/logout", authenticate, userController.userLogout);

authRouter.get("/current", authenticate, userController.checkCurrent);

authRouter.patch("/subscription", authenticate, validateBody(updSubscriptionSchema), userController.updSubscription);

export default authRouter;