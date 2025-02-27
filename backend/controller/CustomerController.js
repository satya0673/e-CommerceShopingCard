import CustomerModel from "../model/ItemModel.js";

//* create post
export const createPost = async (req, resp) => {

    try {

        const { itemName,
            itemPrice,
            itemImageUrl,
            itemDesc,
            itemCategory } = req.body;


        // Get user data from req.user
        const userData = req.user;

        console.log(userData);


        // Create a new object containing post data and user data
        const itemData = {
            itemName,
            itemPrice,
            itemImageUrl,
            itemCategory,
            itemDesc,
            hotelId: userData._id,
            hotelName: userData.hotelName,
            userId: userData._id.toString(),
        };

        const addItem = await CustomerModel.create(itemData);

        if (addItem) {
            return resp.status(200).send({
                msg: 'Item Created!'
            })
        } else {
            return resp.status(500).send({
                msg: 'Something went wrong'
            })
        }



    } catch (error) {
        return resp.status(500).send({
            msg: 'Customer create error'
        })
    }
}

//* get all post
export const getAllPost = async (req, resp) => {

    try {

        const getData = await CustomerModel.find().sort({ _id: -1 });

        // console.log(getData);

        return resp.status(200).send({
            getData
        })

    } catch (error) {

        return resp.status(500).send({
            msg: 'Fetch post error'
        })
    }
}


//* get single post using post id
export const getSinglePostUsingPostId = async (req, resp) => {

    try {

        const postId = req.params._id;

        const singlePost = await CustomerModel.findOne({ _id: postId })

        if (singlePost) {
            return resp.status(200).send({
                singlePost
            })
        } else {
            return resp.status(404).send({
                msg: 'Post not found!'
            })
        }
    } catch (error) {
        return resp.status(500).send({
            msg: 'Fetch single post error'
        })
    }
}

//* get all post using user id
export const getAllPostUsingUserId = async (req, resp) => {

    try {

        const paramUserId = req.params.userId;


        const allPost = await CustomerModel.find({ userId: paramUserId }).sort({ _id: -1 });

        return resp.status(200).send({
            allPost
        })

    } catch (error) {
        return resp.status(500).send({
            msg: 'Fetch User Post Error'
        })
    }
}

//* delete post
export const deletePost = async (req, res) => {

    try {
        const postId = req.params._id;

        const deleteNote = await CustomerModel.findByIdAndDelete(postId);

        if (!deleteNote) {
            return res
                .status(200)
                .json({ success: false, messages: " Post not deleted" });
        }
        res
            .status(201)
            .json({ success: true, messages: "Post deleted successfully" });
    } catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({ success: false, messages: "Post server issues" });
    }
}

//* update post