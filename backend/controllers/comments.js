const Comment = require('../models/comment');
const Post = require('../models/post');

exports.createComment = (req, res, next) => {
  const comment = new Comment({
    content: req.body.content,
    creator: req.userData.userId
  });
  Post.findById(req.body.postId).then(post => {
    if (post) {
      comment.save().then(createdComment => {
        post.comments.push(createdComment);
        post
          .save()
          .then(post => {
            res.status(200).json({
              message: 'Post updated successfully!',
              post: post
            });
          })
          .catch(error => {
            return res.status(500).json({
              message: "Couldn't update post!"
            });
          });
      });
    } else {
      res.status(404).json({ message: 'Post not found!' });
    }
  });
};
