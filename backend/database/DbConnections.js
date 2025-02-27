import mongoose from 'mongoose'

const DbConnections = async () => {

    try {
        // await mongoose.connect(process.env.DB_URL)
        await mongoose.connect("mongodb://127.0.0.1:27017/hotel_management");

        console.log("Db connection sucessfully");

    } catch (error) {
        console.log('Database connection faield');
        console.log(error);

    }
}

export default DbConnections;