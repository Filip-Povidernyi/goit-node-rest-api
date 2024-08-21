import express from "express";

import validateBody from "../helpers/validateBody.js";
import { createUserSchema, updSubscriptionSchema, verifyEmailSchema } from "../schemas/usersSchemas.js";
import userController from "../controllers/usersControllers.js";
import authenticate from "../middlewarws/authenticate.js";
import upload from "../middlewarws/upload.js";



const authRouter = express.Router();

authRouter.post("/register", validateBody(createUserSchema), userController.createUser);

authRouter.get("/verify/:verificationToken", userController.verify);

authRouter.post("/verify", validateBody(verifyEmailSchema), userController.resendVerifyLetter);

authRouter.post("/login", validateBody(createUserSchema), userController.loginUser);

authRouter.post("/logout", authenticate, userController.userLogout);

authRouter.get("/current", authenticate, userController.checkCurrent);

authRouter.patch("/subscription", authenticate, validateBody(updSubscriptionSchema), userController.updSubscription);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), userController.updateAvatar);



export default authRouter;