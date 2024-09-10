import { Request, Response } from 'express';
import { fetchAllUsersWithGames, fetchUserWithGames } from '../services/userGame.service.js'

export async function getAllUserWithGames(_req: Request, res: Response) {
    try {
        const results = await fetchAllUsersWithGames();
        res.json(results);
    } catch (error) {
        console.error("Error fetching users and games: ", error);
        res.status(500).send("Error fetching users and games");
    }
}

export async function getUserWithGames(req: Request, res: Response) {
    const userId = req.params.userId;
    try {
        const result = await fetchUserWithGames(userId);
        res.json(result);
    } catch (error) {
        console.error('Error fetching games for user:', error);
        res.status(500).send('Error fetching user games');
    }
}