import express, { response } from 'express';
import { PORT,mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import loanRoutes from "./routes/loanRoutes.js"
import userRoutes from "./routes/userRoutes.js"

const app = express();
const ip = "13.233.199.127";
app.use(express.json());
app.use(cors());
app.use("/loans",loanRoutes)
app.use("/login",userRoutes)

app.get('/',(request,response)=>{
  console.log(request);
  return response.status(234).send("Welcome to banking app");
})

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("Database Connected Successfully");
        app.listen(PORT,()=>{
            console.log(`App is listening on port: ${PORT}`);
        })
    })
    .catch((e)=>{
        console.log(e);

    })