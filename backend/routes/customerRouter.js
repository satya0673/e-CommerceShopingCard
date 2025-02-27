import express from 'express'
import { createPost, deletePost, getAllPost, getAllPostUsingUserId, getSinglePostUsingPostId } from '../controller/CustomerController.js';
import { verifyToken } from '../middleware/Middleware.js';

const postRouter = express.Router()

postRouter.route("/createItem").post(verifyToken, createPost)
postRouter.route("/getAllItem").get(verifyToken, getAllPost)
postRouter.route("/getItemUsingUserId/:userId").get(verifyToken, getAllPostUsingUserId)
postRouter.route("/getPostUsingItemId/:_id").get(verifyToken, getSinglePostUsingPostId)
postRouter.route("/deleteItemUsingItemId/:_id").delete(verifyToken, deletePost)

export default postRouter;
