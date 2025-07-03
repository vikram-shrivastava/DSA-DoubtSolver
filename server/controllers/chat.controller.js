import express from "express"
import { ChatMessage } from "../models/chatMessages.model.js"

const createChat=async(req,res)=>{
    try {
        const user = req.user.id; 
        const { topic } = req.body;
        if (!user || !topic) {
            return res.status(400).json({ message: "User and topic must be present" });
        }
        const chatMessage = new ChatMessage({
            user,
            topic
        });
        const sessionId = chatMessage.generateSessionId();
        await chatMessage.save();
        return res.status(201).json({ message: "Chat created successfully", sessionId });
    } catch (error) {
        return res.status(500).json({ message: "Error creating chat", error: error.message });
    }
}
const getChatBySessionId = async (req, res) => {
    try {
        const { sessionId } = req.params;
        if (!sessionId) {
            return res.status(400).json({ message: "Session ID must be provided" });
        }
        const chatMessage = await ChatMessage.findOne({ sessionId }).populate("user", "username email");
        if (!chatMessage) {
            return res.status(404).json({ message: "Chat not found" });
        }
        return res.status(200).json(chatMessage);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching chat", error: error.message });
    }
}
const getAllChats = async (req, res) => {
    try {
        const chats = await ChatMessage.find().populate("user", "username email");
        return res.status(200).json(chats);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching chats", error: error.message });
    }
}
const deleteChatBySessionId = async (req, res) => {
    try {
        const { sessionId } = req.params;
        if (!sessionId) {
            return res.status(400).json({ message: "Session ID must be provided" });
        }
        const chatMessage = await ChatMessage.findOneAndDelete({ sessionId });
        if (!chatMessage) {
            return res.status(404).json({ message: "Chat not found" });
        }
        chatMessage.sessionId = null; // Clear sessionId before deletion
        await chatMessage.save();
        return res.status(200).json({ message: "Chat deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting chat", error: error.message });
    }
}

export  { createChat, getChatBySessionId, getAllChats, deleteChatBySessionId };