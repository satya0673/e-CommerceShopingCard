import express from 'express';
import dotenv from 'dotenv';
// Adjust path if necessary
import cors from 'cors';
import DbConnections from './database/DbConnections.js';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/customerRouter.js';
import orderRouter from './routes/orderRouter.js';
import cardRouter from './routes/cardRouter.js';
// import orderRouter from './routes/orderRouter.js';


dotenv.config();

const app = express();

// Middleware setup
app.use(express.json()); // Parses incoming requests with JSON payloads
app.use(cors({
    origin: '*',
    methods: 'POST,GET,PUT,DELETE',
    credentials: true
}));

// Routers setup
app.use('/api/user/', userRouter);
app.use('/api/hotel/', postRouter);
app.use('/api/order/', orderRouter);
app.use('/api/addToCard/', cardRouter);



const PORT = process.env.PORT || 5000;

// Connect to the database and start the server
DbConnections().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
});