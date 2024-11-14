import mongoose from "mongoose";

const Userschema = mongoose.Schema(
  {
    id:{
      type:Number,
      required:true,
    },
    password:{
      type:String,
      required:true,
    }
  }
)

export const user = mongoose.model('user',Userschema);