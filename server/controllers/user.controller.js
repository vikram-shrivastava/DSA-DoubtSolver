import { User } from '../models/user.model.js';


const options={
    httpsOnly:true,
    secure:true,
    sameSite: "strict"
}
const generateAccessandRefreshtoken=async(userid)=>{
    try {
        const user=await User.findById(userid);
        if(!user){
            throw new Error("User not found");
        }
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();
        if(!accessToken || !refreshToken){
            throw new Error("Error generating access or refresh token");
        }
        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false});
        return {accessToken,refreshToken};
    } catch (error) {
        console.error("Error generating tokens:", error);
        throw new Error("Error generating access and refresh tokens");
    }
} 
const register=async(req,res)=>{
    try {
        const {username,email,password,topicsCovered,leetcodeUsername}=req.body;
        if(!username || !email){
            return res.status(400).json({message:"Username or Email must be present"})
        }
        if(!password)
                return res.status(400).json({message:"Password"})

        const existingUser = await User.findOne({
            $or: [
                { username:username},
                { email: email },
            ]
        });
        if(existingUser)
            return res.status(409).json({message:"Username or email already exist"})

        const existingleetcodeID=await User.findOne({
            leetcodeUsername
        })
        if(existingleetcodeID)
            return res.status(409).json({message:"Leetcode Id already exist"})
        const newUser=await User.create({
            username,
            email,
            password,
            topicsCovered:topicsCovered,
            leetcodeUsername,
        })
        await newUser.save();
        if(!newUser)
            return res.status(500).json({message:"Cannot create new user"})
        return res.status(201).json({
            message:"User registered successfully",
            user: {
                username: newUser.username,
                email: newUser.email,
                leetcodeUsername: newUser.leetcodeUsername,
                topicsCovered: newUser.topicsCovered
            }
        });
        
    } catch (error) {
        return res.status(500).json({message:"Error in registrating User in database"})
    }
}

const login=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        if(!username || !email){
            return res.status(400).json({message:"Username and Email must be present"});
        }
        if(!password)
            return res.status(400).json({message:"Password must be present"});
        const user=await User.findOne({username:username,email:email})
        if(!user){
            return res.status(409).json({message:"username and email doesn't exist"});
        }
        const comparePassword=await user.comparePassword(password)
        if(!comparePassword)
            return res.status(400).json({message:"Invalid Password"})
        console.log(process.env.JWT_SECRET);
        if(!process.env.JWT_SECRET)
            return res.status(500).json({message:"JWT secret not configured"});
        // Generate access and refresh tokens
        // const {accessToken}=await user.generateAccessToken();
        // console.log("Access Token:", accessToken);
        // const {refreshToken}=await user.generateRefreshToken();
        // console.log("Refresh Token:", refreshToken);
        const {accessToken,refreshToken}=await generateAccessandRefreshtoken(user._id);
        await user.save();
        const loggedInuser=await User.findById(user._id).select('-password -refreshToken');
        if(!loggedInuser){
            return res.status(500).json({message:"Cannot find user in database"})
        }
        return res
            .status(200)
            .cookie("accessToken",accessToken,options)
            .cookie("refreshToken",refreshToken,options)
            .json({
                message:"Used Logged in Successfully",
                user:loggedInuser
            })
    } catch (error) {
        return res.status(500).json({message:"Error while user login",error:error.message});
    }
}

const logout=async(req,res)=>{
    try {
        req.user=jwt.verify(token,process.env.JWT_SECRET);
        const {userid}=req.user._id;
        const user=await User.findById(userid);
        if(!user){
            return res.status(400).json({message:"Invalid User ID"})
        }
        user.refreshToken = null;
        await user.save();
        return res.status(200).clearCookie("accessToken").clearCookie("refreshToken").json({message:"User logged out successfully"})
    } catch (error) {
        return res.status(500).json({message:"Cannot log out user"})
    }
}

const refreshAccessToken=async(req,res)=>{
    try {
        const {incomingRefreshtoken}=req.cookie.refreshToken;
        if(!incomingRefreshtoken)
            return res.status(401).json({message:"Invalid refreshToken"});
        const decoded=jwt.verify(incomingRefreshtoken,process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        // Check if token matches user's stored token
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== incomingRefreshtoken) {
        return res.status(403).json({ message: "Token mismatch or user not found" });
        }

        // Generate new tokens
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save new refresh token
        await user.save();
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ message: "Access token refreshed successfully" });

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired refresh token", error: error.message });
    }
}
const updateProfile=async(req,res)=>{
    try {
        const {leetcodeUsername,topicsCovered}=req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   
        // Update user fields
        user.leetcodeUsername = leetcodeUsername || user.leetcodeUsername;
        user.topicsCovered = topicsCovered || user.topicsCovered;
        // Save updated user
        await user.save();
        const updatedUser = await User.findById(user._id).select('-password -refreshToken');
        return res.status(200).json({ message: "Profile updated successfully", user: updatedUser 

        });

    } catch (error) {
        return res.status(500).json({ message: "Error updating profile", error: error.message });
    }
}

const getProfile=async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password -refreshToken');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
}
export  {register,login,logout,refreshAccessToken,updateProfile,getProfile};

