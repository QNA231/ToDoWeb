import express from 'express';
import taskRoutes from './routes/tasksRoutes.js';
import { connectDb } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

// middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/tasks", taskRoutes);

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server work on ${PORT}`)
    });
});
