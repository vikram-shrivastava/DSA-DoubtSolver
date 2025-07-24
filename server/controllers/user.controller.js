import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const options={
    httpOnly: true,
      secure: false,            // Set to true in production
      sameSite: 'lax',
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
            return res.status(500).json({message:"Error generating access or refresh token"});
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
        console.log("Registering user:",req.body);
        const {username,email,password,leetcodeUsername,PreferredLanguage}=req.body;
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
            leetcodeUsername,
            PreferredLanguage
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
                PreferredLanguage: newUser.PreferredLanguage
            }
        });
        
    } catch (error) {
        return res.status(500).json({message:"Error in registrating User in database"})
    }
}

const login=async(req,res)=>{
    try {
        const {username,password}=req.body;
        if(!username ){
            return res.status(400).json({message:"Username must be present"});
        }
        if(!password)
            return res.status(400).json({message:"Password must be present"});
        const user=await User.findOne({username:username})
        if(!user){
            return res.status(409).json({message:"username doesn't exist"});
        }
        const comparePassword=await user.comparePassword(password)
        if(!comparePassword)
            return res.status(400).json({message:"Invalid Password"})
        // console.log(process.env.JWT_SECRET);
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
        console.log("Logged in user:", loggedInuser);
        if(!accessToken || !refreshToken){
            return res.status(500).json({message:"Error generating access or refresh token"})
        }
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
        console.error("Login error:", error.message);
        return res.status(500).json({message:"Error while user login",error});
    }
}

const logout=async(req,res)=>{
    try {
    const userId = req.user.id || req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    user.refreshToken = null;
    await user.save();

    return res
      .status(200)
      .clearCookie("accessToken", { httpOnly: true, sameSite: "Lax" })
      .clearCookie("refreshToken", { httpOnly: true, sameSite: "Lax" })
      .json({ message: "User logged out successfully" });

  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({ message: "Cannot log out user" });
  }
}

const refreshAccessToken = async (req, res) => {
  try {
    console.log("Refreshing access token...", req.cookies);
    const { refreshToken } = req.cookies;
    console.log("Incoming Refresh Token:", refreshToken);

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Token mismatch or user not found" });
    }

    // Generate new tokens
    const accessToken = user.generateAccessToken();
    const newrefreshToken = user.generateRefreshToken();

    // Update user with new refreshToken
    user.refreshToken = newrefreshToken;
    await user.save();

    // Set cookies
    const cookieOptions = {
      httpOnly: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", newrefreshToken, cookieOptions)
      .json({ message: "Token refreshed" });

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired refresh token", error: error.message });
  }
};

const updateProfile=async(req,res)=>{
    try {
        const {leetcodeUsername,PreferredLanguage}=req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   
        // Update user fields
        user.leetcodeUsername = leetcodeUsername || user.leetcodeUsername;
        user.PreferredLanguage = PreferredLanguage || user.PreferredLanguage;
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


const getLeetcodeProfile = async (req, res) => {
  const { username } = req.body;

  // Validate username
  if (!username || typeof username !== 'string') {
    return res.status(400).json({ 
      error: "Username is required and must be a string" 
    });
  }

  const query = `
    query stats($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          userAvatar
          realName
          aboutMe
          school
          websites
          countryName
          company
          jobTitle
          skillTags
          reputation
          ranking
        }
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
          totalSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        problemsSolvedBeatsStats {
          difficulty
          percentage
        }
        tagProblemCounts {
          advanced { 
            tagName 
            tagSlug
            problemsSolved 
          }
          intermediate { 
            tagName 
            tagSlug
            problemsSolved 
          }
          fundamental { 
            tagName 
            tagSlug
            problemsSolved 
          }
        }
        userCalendar {
          activeYears
          streak
          totalActiveDays
          submissionCalendar
        }
        badges {
          id
          displayName
          icon
          creationDate
        }
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
        badge {
          name
        }
      }
      recentAcSubmissionList(username: $username, limit: 10) {
        id
        title
        titleSlug
        timestamp
      }
    }
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return res.status(400).json({ 
        error: "GraphQL query failed", 
        details: data.errors 
      });
    }

    const user = data.data.matchedUser;
    const contestRanking = data.data.userContestRanking;
    const recentSubmissions = data.data.recentAcSubmissionList;

    if (!user) {
      return res.status(404).json({ 
        error: "User not found", 
        message: `LeetCode user '${username}' does not exist or profile is private` 
      });
    }

    // Calculate acceptance rate
    const calculateAcceptanceRate = (submitStats) => {
      if (!submitStats || !submitStats.acSubmissionNum) return 0;
      
      const totalAccepted = submitStats.acSubmissionNum.reduce(
        (sum, item) => sum + (item.count || 0), 0
      );
      const totalSubmissions = submitStats.acSubmissionNum.reduce(
        (sum, item) => sum + (item.submissions || 0), 0
      );
      
      return totalSubmissions > 0 
        ? parseFloat(((totalAccepted / totalSubmissions) * 100).toFixed(2))
        : 0;
    };

    // Process difficulty stats
    const processDifficultyStats = (submitStats) => {
      if (!submitStats || !submitStats.acSubmissionNum) {
        return { easy: 0, medium: 0, hard: 0, total: 0 };
      }

      const stats = {
        easy: 0,
        medium: 0,
        hard: 0,
        total: 0
      };

      submitStats.acSubmissionNum.forEach(item => {
        const difficulty = item.difficulty.toLowerCase();
        if (stats.hasOwnProperty(difficulty)) {
          stats[difficulty] = item.count || 0;
          stats.total += item.count || 0;
        }
      });

      return stats;
    };

    // Process topic stats
    const processTopicStats = (tagProblemCounts) => {
      const topicStats = {};
      
      if (!tagProblemCounts) return topicStats;

      const allTopics = [
        ...(tagProblemCounts.fundamental || []),
        ...(tagProblemCounts.intermediate || []),
        ...(tagProblemCounts.advanced || [])
      ];

      allTopics.forEach(topic => {
        const topicName = topic.tagName;
        if (topicStats[topicName]) {
          topicStats[topicName] += topic.problemsSolved || 0;
        } else {
          topicStats[topicName] = topic.problemsSolved || 0;
        }
      });

      return topicStats;
    };

    // Process beats stats
    const processBeatsStats = (beatsStats) => {
      const processed = {
        easy: 0,
        medium: 0,
        hard: 0,
        overall: 0
      };

      if (!beatsStats || !Array.isArray(beatsStats)) return processed;

      beatsStats.forEach(stat => {
        const difficulty = stat.difficulty.toLowerCase();
        if (processed.hasOwnProperty(difficulty)) {
          processed[difficulty] = stat.percentage || 0;
        }
      });

      // Calculate overall average
      const validPercentages = Object.values(processed).filter(p => p > 0);
      processed.overall = validPercentages.length > 0 
        ? parseFloat((validPercentages.reduce((sum, p) => sum + p, 0) / validPercentages.length).toFixed(1))
        : 0;

      return processed;
    };

    // Format calendar data
    const formatCalendarData = (calendar) => {
      if (!calendar) return null;
      
      return {
        activeYears: calendar.activeYears || [],
        streak: calendar.streak || 0,
        totalActiveDays: calendar.totalActiveDays || 0,
        submissionCalendar: calendar.submissionCalendar ? 
          JSON.parse(calendar.submissionCalendar) : {}
      };
    };

    // Build comprehensive response
    const processedData = {
      // Basic user info
      username: user.username,
      profile: user.profile || {},
      
      // Core statistics
      totalSolved: processDifficultyStats(user.submitStats).total,
      acceptanceRate: calculateAcceptanceRate(user.submitStats),
      
      // Contest and ranking data
      contestRanking: {
        globalRanking: contestRanking?.globalRanking || null,
        rating: contestRanking?.rating || null,
        attendedContests: contestRanking?.attendedContestsCount || 0,
        topPercentage: contestRanking?.topPercentage || null,
        totalParticipants: contestRanking?.totalParticipants || null,
        badge: contestRanking?.badge?.name || null
      },
      
      // Difficulty breakdown
      byDifficulty: processDifficultyStats(user.submitStats),
      
      // Topic breakdown
      byTopic: processTopicStats(user.tagProblemCounts),
      
      // Performance stats
      beatsStats: processBeatsStats(user.problemsSolvedBeatsStats),
      
      // Activity data
      calendar: formatCalendarData(user.userCalendar),
      
      // Achievements
      badges: user.badges || [],
      
      // Recent activity
      recentSubmissions: recentSubmissions || [],
      
      // Metadata
      lastUpdated: new Date().toISOString(),
      dataSource: "leetcode.com"
    };

    // Log successful fetch for monitoring
    console.log(`Successfully fetched LeetCode data for user: ${username}`);
    
    res.status(200).json({
      success: true,
      data: processedData
    });

  } catch (error) {
    console.error("LeetCode fetch error:", error);
    
    // Different error handling based on error type
    if (error.message.includes('HTTP error')) {
      return res.status(503).json({ 
        error: "LeetCode service unavailable",
        message: "Unable to connect to LeetCode. Please try again later."
      });
    }
    
    if (error.name === 'AbortError') {
      return res.status(408).json({ 
        error: "Request timeout",
        message: "LeetCode request took too long. Please try again."
      });
    }
    
    res.status(500).json({ 
      error: "Internal server error",
      message: "Failed to fetch LeetCode data. Please try again later."
    });
  }
};

const getMe = async (req, res) => {
  try {
    console.log("Getting user info for ID:", req.user.id);
    const userId = req.user.id; // added by auth middleware
    console.log("ID:",userId)
    if(!userId)
        return res.status(404).json({message:"user id not found"})
    const user = await User.findById(userId).select("-password"); // exclude password
    console.log("user:",user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getMe:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export  {register,login,logout,refreshAccessToken,updateProfile,getProfile,getLeetcodeProfile,getMe };

