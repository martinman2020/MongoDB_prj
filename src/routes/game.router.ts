// External Dependencies
import express, { Request, Response } from "express";
// import { ObjectId } from "mongodb";
import { collections } from "../services/database.service.js";
import { Game } from "../models/game.js";
import { User } from "../models/users.js";
import { ObjectId } from "mongodb";
// Global Config
export const gamesRouter = express.Router();

gamesRouter.use(express.json());

// GET
gamesRouter.get("/", async (_req: Request, res: Response) => {
    try {
        // If 'games' is undefined, toArray() will not be exected, and 'games' will become an empty array
        const games = (await collections.games?.find({}).toArray()) as Game[];
        // console.log("games: ", games);
        res.status(200).send(games);
    } catch (error) {
        const err = error as Error;
        res.status(500).send(err.message);
    }
});

gamesRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const query = { _id: new ObjectId(id) };
        const game = await collections.games?.findOne(query) as Game;

        if (game) {
            res.status(200).send(game);
        } else {
            res.status(404).send(`No matching data with id: ${id}`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(`Invalid request for id: ${id}`);
    }
});
// // POST
gamesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { name, price, category, releaseYear } = req.body;
        const newGame: Game = { name, price, category, releaseYear };
    
        let game = await collections.games?.findOne({ name: newGame.name });
        if (!game) {
            const result = await collections.games?.insertOne(newGame);
            if (result?.insertedId) {
                game = { _id: result.insertedId, ...newGame };
                return res.status(201).send(`Game id: ${game._id} created successfully!`);
            } else {
                return res.status(500).send("Create game failed!");
            }
        } else {
            return res.status(200).send("Game already exists.");
        }
    } catch (error) {
        const err = error as Error;
        console.error(err);
        return res.status(400).send(err.message);
    }
});
// PUT
gamesRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        // const { name, price, category, releaseYear } = req.body;
        // const updatedGame: Partial<Game> = { name, price, category, releaseYear };
        const updatedGame = { ...req.body };
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.games?.updateOne(query, { $set: updatedGame });

        result && result.modifiedCount > 0
            ? res.status(200).send(`Successfully updated game with id ${id}`)
            : res.status(304).send(`Game with id: ${id} not updated`);
    } catch (error) {
        const err = error as Error
        console.error(err.message);
        res.status(400).send(err.message);
    }
});
// DELETE
gamesRouter.delete("/:id", async (req: Request, res: Response)=> {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.games?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Sucessfully deleted game with id: ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove game with id: ${id}`);
        } else {
            res.status(404).send(`Game with id: ${id} does not exist`);
        }

    } catch (error) {
        const err = error as Error;
        console.error(err.message);
        res.status(400).send(err.message);
    }
});