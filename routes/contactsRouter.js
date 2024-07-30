import express from "express";
import controller from "../controllers/contactsControllers.js";
import { createContactSchema, updateContactSchema, updateStatusContactSchema } from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";



const contactsRouter = express.Router();

contactsRouter.get("/", controller.getAllContacts);

contactsRouter.get("/:id", controller.getOneContact);

contactsRouter.delete("/:id", controller.deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), controller.createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), controller.updateContact);

contactsRouter.patch("/:id/favorite", validateBody(updateStatusContactSchema), controller.updateStatus);

export default contactsRouter;