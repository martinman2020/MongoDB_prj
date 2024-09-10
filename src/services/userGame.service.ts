import { getDb } from './database.service.js';
import { ObjectId } from 'mongodb'; 

export async function fetchAllUsersWithGames() {
    const db = getDb();
    const userGames = db.collection('userGames');

    return await userGames.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userInfo'
            }
        },
        {
            $lookup: {
                from: 'games',
                localField: 'gameId',
                foreignField: '_id',
                as: 'gameInfo'
            }
        },
        {
            $unwind: '$userInfo'
        },
        {
            $unwind: '$gameInfo'
        },
        {
            $group: {
                _id: '$userInfo._id',
                username: { $first: '$userInfo.username' },
                games: { $push: '$gameInfo.name'}
            }
        }
    ]).toArray();
}

export async function fetchUserWithGames(userId: string) {
    const db = getDb();
    const userGames = db.collection('userGames');

    return await userGames.aggregate([
        {
            $match: { userId: new ObjectId(userId) }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userInfo'
            }
        },
        {
            $lookup: {
                from: 'games',
                localField: 'gameId',
                foreignField: '_id',
                as: 'gameInfo'
            }
        },
        {
            $unwind: '$userInfo'
        },
        {
            $unwind: '$gameInfo'
        },
        {
            $group: {
                _id: '$userId',
                username: { $first: '$userInfo.username' },
                games: { $push: '$gameInfo.name'}
            }
        }
    ]).toArray();
}