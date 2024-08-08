import express from "express";
import validateBody from "../helpers/validateBody.js";
import { createUserSchema } from "../schemas/usersSchemas.js";
import userController from "../controllers/usersControllers.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(createUserSchema), userController.createUser);

authRouter.post("/login", validateBody(createUserSchema), userController.loginUser);

export default authRouter;