import express from "express";
import { connectToDatabase } from "./services/database.service.js";
import { gamesRouter } from "./routes/game.router.js";
import { userGamesRouter } from "./routes/userGames.router.js";

const app = express();
const port = process.env.PORT || 8080;

connectToDatabase()
    .then(() => {
        app.use("/api/games", gamesRouter);
        app.use("/api", userGamesRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });