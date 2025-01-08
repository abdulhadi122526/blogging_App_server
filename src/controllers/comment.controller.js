import Comment from '../models/coments.model.js'
import Posts from '../models/post.model.js'


const comment = async (req, res) => {
    const {postId , text} = req.body;

   try {
      const createComment = await Comment.create({
        user: req.userId,
        post: postId,
        text
      })

      const post = await Posts.findByIdAndUpdate(
        postId,
        {$push: {comments: createComment._id}},
        {new: true}
      ).exec()
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json({
        message: "comment created",
        comment: createComment
      })
    res.status(201).json(comment);
   } catch (error) {
    res.status(400).json({ error: error.message });
   }

}
export {comment};

