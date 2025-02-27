import mongoose from 'mongoose'
import jsonWebToken from 'jsonwebtoken'
const userModel = new mongoose.Schema({

    userName: {
        type: String,
        require: true
    },
    userEmail: {
        type: String,
        require: true,
        unique: true
    },
    userPass: {
        type: String,
        require: true
    },
    userPhNo: {
        type: String,
        require: true
    },
    hotelName: {
        type: String,
        default: "null",
        require: true
    },
    hotelAddress: {
        type: String,
        require: true
    },
    userRole: {
        type: String,
        require: true
    },

}, { timestamps: true })


userModel.methods.generatedToken = async function () {

    try {
        return jsonWebToken.sign({
            userId: this._id.toString(),
            userEmail: this.userEmail
        },
            "anilcjckdsydhncdnuhxnuynhygfnoucygxmfu",
            {
                expiresIn: '30d'
            }
        )
    } catch (error) {
        console.log(error);
    }
}
const User = new mongoose.model("UserModel", userModel)

export default User;