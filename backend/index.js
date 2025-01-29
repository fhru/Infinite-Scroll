import express from 'express'
import cors from 'cors'
import userRoutes from "./routes/UserRoutes.js"
import db from './config/Database.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(userRoutes);

(async () => {
    try {
        await db.sync();
        console.log("Database synchronized successfully.");

        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.error("Unable to synchronize database:", error);
    }
})();
