const express = require('express');

const CommentController = require('../controllers/comments');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', CommentController.createComment);

module.exports = router;
