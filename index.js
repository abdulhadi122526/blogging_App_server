import express from "express";
import connectDB from "./src/db/index.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import userRouter from "./src/routers/user.router.js"
import postRouter from "./src/routers/post.router.js"
import likeRouter from "./src/routers/like.router.js"
import commentRouter from "./src/routers/comment.router.js"


const app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/api/v1" , userRouter)
app.use("/api/v1" , postRouter)
app.use("/api/v1" , likeRouter)
app.use("/api/v1" , commentRouter)
dotenv.config();




app.get('/', (req, res) => {
    res.send("hellow world!")
})


connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running  at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });