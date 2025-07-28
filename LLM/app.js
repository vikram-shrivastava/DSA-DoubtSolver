import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config()
const app=express();
//middlewares
app.use(cors({
    origin: "http://localhost:5000",
    credentials: true
}));
app.use(express.json({
    limit:'50mb'
}));
app.use(express.urlencoded({ extended: true ,limit: '50mb' }));
app.use(cookieParser());

//routes declaration
// app.use('/api/v1/chatmodel',)

//listen
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log('Server is running on PORT:',PORT)
})