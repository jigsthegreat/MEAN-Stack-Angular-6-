const Comment = require('../models/comment');
const Post = require('../models/post');

exports.createComment = (req, res, next) => {
  // console.log(req);
  console.log(req.body);
  const comment = new Comment({
    content: req.body.content,
    // creator: req.userData.userId
    creator: '5b3064d866f483199c311a69'
  });
  console.log(comment);
  console.log(req.body.postId);
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
