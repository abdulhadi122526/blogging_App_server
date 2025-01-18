import Comment from '../models/coments.model.js'
import Posts from '../models/post.model.js'

// creat comment
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

// delete commenst
const deleteComment = async (req, res) => {
  const {id} = req.params;
  console.log(id);
  
 try {
   const deletedComment = await Comment.findByIdAndDelete({ _id: id})
   if (!deletedComment) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json({
    message: "comment delteted",
    comment: deletedComment
  })
 } catch (error) {
  res.status(500).json({
    message:"internal server error"
  })
 }
}
export {comment , deleteComment};

