import express from "express";
import controller from "../controllers/contactsControllers.js";
import { createContactSchema, updateContactSchema, updateStatusContactSchema } from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import checkBody from "../helpers/checkBody.js";
import authenticate from "../middlewarws/authenticate.js";



const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", controller.getAllContacts);

contactsRouter.get("/:id", controller.getOneContact);

contactsRouter.delete("/:id", controller.deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), controller.createContact);

contactsRouter.put("/:id", checkBody, validateBody(updateContactSchema), controller.updateContact);

contactsRouter.patch("/:id/favorite", checkBody, validateBody(updateStatusContactSchema), controller.updateStatus);



export default contactsRouter;