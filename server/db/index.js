import mongoose from "mongoose";
import { DB_name } from "../constant.js";
async function ConnectDB()
{
    try {
        console.log("Connecting to MongoDB...");
        const connectioninstance=await mongoose.connect(`${process.env.MONGODB_URI}${process.env.DB_NAME}`)
        console.log("MongoDb Connected !!!",connectioninstance.connection.host);
        
    } catch (error) {
        console.log("Mongo DB connection failed",error)
        // throw err
        process.exit(1)
    }
}
export default ConnectDB