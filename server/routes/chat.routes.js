import { app } from "../app.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  createChat,
  getAllChats,
  getChatBySessionId as getChatById,
  deleteChatBySessionId as deleteChat,
} from "../controllers/chat.controller.js";
const chatRoutes = Router();
chatRoutes.post("/", verifyToken, createChat);
chatRoutes.get("/", verifyToken, getAllChats);
chatRoutes.get("/:id", verifyToken, getChatById);
chatRoutes.delete("/:id", verifyToken, deleteChat);
chatRoutes.get("/", (req, res) => {
  res.status(200).json({ message: "Chat route is working" });
});
export default chatRoutes;