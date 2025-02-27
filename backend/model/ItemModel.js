import mongoose from "mongoose"

const customerModel = new mongoose.Schema({

    itemName: {
        type: String,
        require: true
    },
    itemPrice: {
        type: String,
        require: true
    },
    itemImageUrl: {
        type: String,
        require: true
    },
    itemCategory: {
        type: String,
        require: true
    },
    itemDesc: {
        type: String,
        require: true
    },
    hotelId: {
        type: String,
        require: true
    },
    hotelName: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    }
}, { timestamps: true })

const CustomerModel = new mongoose.model("CustomerModel", customerModel)

export default CustomerModel;