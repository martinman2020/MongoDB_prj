import express, { Request, Response } from "express";
// import { ObjectId } from "mongodb";
import { collections } from "../services/database.service.js";
import { Game } from "../models/game.js";
import { User } from "../models/users.js";
import { ObjectId } from "mongodb";
import { getAllUserWithGames, getUserWithGames } from "../controllers/userGames.controller.js"

export const userGamesRouter = express.Router();

userGamesRouter.use(express.json());

//GET user with games
userGamesRouter.get("/users/games", getAllUserWithGames);
userGamesRouter.get("/users/:userId/games", getUserWithGames);

//GET
userGamesRouter.get("/user-games", async (_req: Request, res: Response) => {
    try {
        const userGames = (await collections.userGames?.find({}).toArray());
        res.status(200).send(userGames);
    } catch (error) {
        const err = error as Error;
        res.status(500).send(err.message);
    }
});
// POST
userGamesRouter.post("/user-games", async (req: Request, res: Response) => {
    try {
        // const { _id, name, price, category, releaseYear } = req.body;
        // const newGame: Game = { _id, name, price, category, releaseYear };
        const { username, email, gameData } = req.body;

        // Find user
        const user = await collections.users?.findOne({ 
            $and: [
                { email: email }, 
                { username: username }
            ]
         });
        if (!user) {
            return res.status(404).send("User not found");
        }

        //Find game, if not, add new game
        let game = await collections.games?.findOne({ name: gameData.name });
        if(!game) {
            const result = await collections.games?.insertOne(gameData);
            if (result?.insertedId) {
                game = { _id: result.insertedId, ...gameData };
            } else {
                res.status(500).send("Failed to create a new game.");
            }
        }

        // Ensure game is defined
        if (!game) {
            return res.status(500).send("Game creation failed.");
        }

        // Insert user-game relationship
        let checkExist = await collections.userGames?.findOne({ userId: user._id, gameId: game._id });
        if (!checkExist) {
            const userGameResult = await collections.userGames?.insertOne({
                userId: user._id,
                gameId: game._id
            });
            if (userGameResult) {
                res.status(201).send(`Game: "${game.name}" and relationship (userId: "${user._id}" & gameId: "${game._id}") inserted successfully`);
            } else {
                res.status(500).send("Failed to create user-game relationship");
            }
        } else {
            res.status(400).send(`The relationship between ${user._id}:${user.username}:${user.email} and ${game._id}:${game.name} already exists.`);
        }

    } catch (error) {
        const err = error as Error;
        console.error(err);
        res.status(400).send(err.message);
    }
});
