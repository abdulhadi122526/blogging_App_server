import Posts from "../models/post.model.js"

const creatPost = async (req , res) => {
    const {title , content} = req.body;

    try {
        const createPost = await Posts.create({
            title,
            content,
            user: req.userId
        })

        res.json({
            message: "uploaded post",
            posts: createPost
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}
// get post


const getPosts = async (req , res ) => {
  try {
    const allPosts = await Posts.find()
    .populate("user" , 'username')
    .populate('like' , 'username')
    .populate({
      path: "comments",
      select: "text",
      populate:{
        path: "user",
        select: "username"
      }
    })

    res.json(allPosts)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export {creatPost , getPosts}