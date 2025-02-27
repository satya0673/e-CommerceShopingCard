import express from 'express';
import dotenv from 'dotenv';
import DbConnections from '../database/DbConnections.js'; // Adjust path if necessary
import userRouter from '../routes/userRouter.js'; // Adjust path if necessary
import serverless from 'serverless-http';
import cors from 'cors';
import customerRouter from '../routes/customerRouter.js'; // Adjust path if necessary


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
app.use('/api/user/crm', userRouter);
app.use('/api/customer/crm', customerRouter);



const PORT = process.env.PORT || 5000;

// Connect to the database and start the server
DbConnections().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
});

export const handler = serverless(app);
