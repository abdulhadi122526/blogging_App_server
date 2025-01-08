import Like from "../models/like.model.js";
import Post from "../models/post.model.js";

const likePost = async (req, res) => {
  const { postId } = req.body; // kis post pr like krna hai us ko is k zariye get krna hai

  try {
    const isLikedPost = await Like.findOne({ user: req.userId, post: postId }); // check krna hai k pehly se like hai ya nahi
    if (isLikedPost)
      return res
        .status(400)
        .json({ message: "you have already liked this post" });

    const likedPost = await Like.create({ user: req.userId, post: postId }); // like create krny k liye user me user aey ga or post me kis post pr like kia hai wo 

    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { like: req.userId } },
      { new: true }
    ); // like ko post me push krny k liye
    res.status(201).json(likedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {likePost}