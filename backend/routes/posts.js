const express = require('express');

const PostController = require('../controllers/posts');
const CommentController = require('../controllers/comments');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const router = express.Router();

router.post('', checkAuth, extractFile, PostController.createPost);

router.post('/comments', checkAuth, extractFile, CommentController.createComment);

router.put('/:id', checkAuth, extractFile, PostController.updatePost);

router.get('', PostController.getPosts);

router.get('/:id', PostController.getPost);

router.delete('/:id', checkAuth, PostController.deletePost);

module.exports = router;
