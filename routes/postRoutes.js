const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const { createPost, updatePost, deletePost, getAllPosts } = require("../controllers/postController");



router.route('/post/create').post(isLoggedIn, createPost)
router.route('/post/update/:id').put(isLoggedIn, updatePost)
router.route('/post/update/:id').delete(isLoggedIn, deletePost)
router.route('/post/allposts').get(getAllPosts)




module.exports = router