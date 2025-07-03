import mongoose,{Schema, Types} from "mongoose";
import {v4 as uuidv4} from "uuid";

const chatMessageSchema = new Schema({
    user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  topic: {
    type: String,
    required:true,
    default: null
  },
  starsDeducted: {
    type: Number,
    default: 0
  },
  sessionId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

chatMessageSchema.methods.generateSessionId=function(){
    const sessionId = uuidv4();
    this.sessionId = sessionId;
    return sessionId;
}

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
export {ChatMessage};