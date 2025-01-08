import mongoose from "mongoose";
import User from "../models/user.model.js"


const postSchema = new mongoose.Schema(
    {
        title: {type: String , required: true},
        content: {type: String , required: true},
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        like:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }],
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            required: true
        }]
        
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Posts',postSchema)