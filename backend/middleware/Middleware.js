import jwt from 'jsonwebtoken';
import User from '../model/UserModel.js'; // Adjust path if necessary

export const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send({
            msg: 'Token not found!'
        });
    }

    const jwtToken = token.replace('Bearer ', '').trim();

    try {
        const decoded = jwt.verify(jwtToken, "anilcjckdsydhncdnuhxnuynhygfnoucygxmfu");
        const userData = await User.findOne({ _id: decoded.userId }, { userPass: 0 });

        if (!userData) {
            return res.status(404).send({
                msg: 'User not found!'
            });
        }

        req.user = userData;
        next();
    } catch (error) {
        return res.status(401).send({
            msg: 'Invalid token!',
            error: error.message
        });
    }
};
