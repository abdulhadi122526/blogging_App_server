import Like from "../models/like.model.js";
import Post from "../models/post.model.js";

const likePost = async (req, res) => {
  const { postId } = req.body;
  try {
    const isLikedPost = await Like.findOneAndDelete({ user: req.userId, post: postId });
    
    const unLikePost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { like: req.userId } },
      { new: true }
    ); // like ko post me push krny k liye
    if (isLikedPost)
      return res
        .status(200)
        .json({ message: "Post unliked"});

    const likedPost = await Like.create({ user: req.userId, post: postId });

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

export { likePost };
