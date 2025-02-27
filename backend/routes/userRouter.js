import express from 'express';
import { createUser, loginUser, getAllUser, getSingleUser, getSingleUserUsingPost, deleteSingleUser, updateUserData, accountIsPrivateOrNot } from '../controller/UserController.js';
import { verifyToken } from '../middleware/Middleware.js';

const userRouter = express.Router();

userRouter.route('/createUser').post(createUser);
userRouter.route('/loginUser').post(loginUser);
userRouter.route('/getAllUser').get(getAllUser);
userRouter.route('/getSingleUser/:_id').get(verifyToken, getSingleUser);
userRouter.route('/getSingleUserPost/:_id').get(verifyToken, getSingleUserUsingPost);
userRouter.route('/deleteSingleUser/:_id').delete(verifyToken, deleteSingleUser);
userRouter.route('/updateUser/:_id').put(verifyToken, updateUserData);


export default userRouter;
