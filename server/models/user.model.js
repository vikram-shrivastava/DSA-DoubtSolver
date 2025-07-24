import mongoose,{Schema, Types} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    refreshToken: {
        type: String,
        default: null
    },
    leetcodeUsername:{
        type: String,
        default: null,
        trim: true
    },
    PreferredLanguage:{
        type:String,
        default:"Cpp",
        required:true
    },
    chatMessages:[{
        type:Schema.Types.ObjectId,
        ref:"chatMessages",
    }]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
userSchema.methods.generateAccessToken = function () {
    const token = jwt.sign({ id: this._id,user:this.user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION || '1h' });
    return token;
};
userSchema.methods.generateRefreshToken = function () {
    const token = jwt.sign({ id: this._id, user:this.user }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d' });
    this.refreshToken = token;
    return token;
}

const User = mongoose.model('User', userSchema);
export { User };
