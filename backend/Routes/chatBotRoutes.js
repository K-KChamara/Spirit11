import express from "express";
import { chatBotController } from "../controllers/chatBotController.js";

const ChatBotRouter = express.Router();

ChatBotRouter.post("/",chatBotController);

export default ChatBotRouter;