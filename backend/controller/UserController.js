import PostModel from "../model/ItemModel.js";
import User from "../model/UserModel.js";
import bcrypt from 'bcryptjs'

export const createUser = async (req, resp) => {

    try {

        const { userName, userEmail, userPass, userPhNo, userRole, hotelName, hotelAddress } = req.body;

        const exitUser = await User.findOne({ userEmail });

        if (exitUser) {
            return resp.status(409).send({
                msg: 'User already exit'
            })
        }

        const hashPass = await bcrypt.hash(userPass, 10)

        const user = await User.create({ userName, userEmail, userPass: hashPass, userPhNo, userRole, hotelName, hotelAddress })

        if (user) {
            resp.status(201).send({
                msg: 'User Register successfully !',
            })

        }
    } catch (error) {

        resp.status(500).send({
            msg: 'User create error'
        })
    }

}


export const loginUser = async (req, resp) => {
    try {
        const { userEmail, userPass } = req.body;

        console.log(userEmail);


        const exitUser = await User.findOne({ userEmail });

        if (!exitUser) {
            return resp.status(404).send({
                msg: 'User email not found!'
            });
        }

        const isPassMatch = await bcrypt.compare(userPass, exitUser.userPass);

        if (!isPassMatch) {
            return resp.status(404).send({
                msg: 'User password invalid!'
            });
        }

        exitUser.userPass = undefined; // Hide the password

        const token = await exitUser.generatedToken();

        console.log('Generated Token:', token); // Debugging log

        return resp.status(200).send({
            msg: 'User login successfully!',
            token,
            user: exitUser._id,
            userRole: exitUser.userRole
        });

    } catch (error) {
        console.error('Login error:', error); // Debugging log
        return resp.status(500).send({
            msg: 'Login user error!'
        });
    }
}


export const getAllUser = async (req, resp) => {

    try {

        const userData = await User.find().sort({ _id: -1 });

        return resp.status(200).send({
            userData
        })
    } catch (error) {
        return resp.status(500).send({
            msg: 'User Data find error'
        })
    }
}

export const getSingleUser = async (req, resp) => {

    const userData = req.user;
    const reqId = req.params._id;


    console.log(userData);

    if (userData._id.toString() === reqId) {

        return resp.status(200).send({
            user: userData
        })

    } else {

        return resp.status(403).send({
            msg: 'Invalid user !'

        })
    }

}

export const getSingleUserUsingPost = async (req, resp) => {

    try {

        const userId = req.params._id;

        const userData = await User.findOne({ _id: userId })

        userData.userPass = undefined;

        if (userData) {

            return resp.status(200).send({
                user: userData
            })

        } else {

            return resp.status(403).send({
                msg: 'User Not found !'

            })
        }

    } catch (error) {
        return resp.status(403).send({
            msg: 'User Not found !'

        })
    }

}

export const deleteSingleUser = async (req, resp) => {

    const userData = req.user;
    const reqId = req.params._id;



    if (userData._id.toString() === reqId) {

        const deleteUser = await User.deleteOne({ _id: userData._id.toString() })

        if (deleteUser.acknowledged) {
            return resp.status(200).send({
                msg: 'User Deleted'
            })
        } else {
            return resp.status(403).send({
                msg: 'User not deleted'
            })
        }

    } else {

        return resp.status(403).send({
            msg: 'Invalid user !'

        })
    }
}



export const updateUserData = async (req, resp) => {


    const reqId = req.params._id;

    const userdata = req.body;

    try {
        // Check if the user exists
        const userData = await User.findOne({ _id: reqId });

        if (!userData) {
            return resp.status(404).json({ msg: 'User not found' });
        }

        //update the post data like user name, photo
        const post = await PostModel.find({ userId: reqId })

        if (post) {
            const result = await PostModel.updateMany(
                { userId: reqId },
                { $set: { userName: userdata?.userName, userImage: userdata?.userImage } }
            );

        }

        // Perform update operation if user is found
        const result = await User.updateOne(
            { _id: reqId },
            { $set: userdata }
        );




        // Check if update operation was successful
        if (result.modifiedCount === 1) {
            return resp.status(200).json({
                msg: 'User data updated successfully',
            });
        } else {
            return resp.status(500).json({ msg: 'Failed to update user data' });
        }
    } catch (error) {

        return resp.status(500).send({
            msg: 'Update user error'
        })
    }

}

//set account is private or not

export const accountIsPrivateOrNot = async (req, resp) => {
    try {

        const userId = req.params._id;
        const userAccountIsPrivate = req.params.userAccountIsPrivate;


        // Perform update operation if user is found
        const result = await User.updateOne(
            { _id: userId },
            { $set: { userAccountIsPrivate: userAccountIsPrivate } }
        );



        if (result.modifiedCount === 1) {

            const userData = await User.findOne({ _id: userId })

            userData.userPass = undefined;

            return resp.status(200).json({
                userData
            });
        } else {
            return resp.status(500).json({ msg: 'Failed to update user data' });
        }

    } catch (error) {

        return resp.status(500).send({
            msg: 'Account private or not error'
        })
    }
}