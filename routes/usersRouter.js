import express from "express";
import validateBody from "../helpers/validateBody.js";
import { createUserSchema } from "../schemas/usersSchemas.js";
import userController from "../controllers/usersControllers.js";


const userRouter = express.Router();

userRouter.post("/auth/register", validateBody(createUserSchema), userController.createUser);

export default userRouter;