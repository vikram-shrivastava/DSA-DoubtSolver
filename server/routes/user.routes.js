import { app} from "../app.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {register,login,logout,refreshAccessToken,updateProfile,getProfile} from "../controllers/user.controller.js";
const userRouter =Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", verifyToken, logout);
userRouter.post("/refresh-token", refreshAccessToken);
userRouter.put("/update-profile", verifyToken, updateProfile);
userRouter.get("/profile", verifyToken, getProfile);
userRouter.get("/", (req, res) => {
    res.status(200).json({ message: "User route is working" });
});
export default userRouter;
