// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { Game } from "../models/game.js";
import { User } from "../models/users.js";
import { UserGame } from "../models/userGames.js";
import { Collection } from "mongodb";
// Global Variables
export const collections: { 
    games?: Collection<Game>,
    users?: Collection<User>,
    userGames?: Collection<UserGame> 
} = {};

let db: mongoDB.Db;

// Initialize Connection
async function initializeCollections(db: mongoDB.Db, collectionNames: string[]) {
    const existingCollections = await db.listCollections().toArray();
    const existingNames = existingCollections.map(col => col.name);

    for (const name of collectionNames) {
        if(!existingNames.includes(name)) {
            try {
                await db.createCollection(name);
                console.log(`Collection ${name} created.`);
            } catch (error: any) {
                console.error(`Error creating collection ${name}:`, error);
            }
        } else {
            console.log(`Collection ${name} already exists.`);
        }
    }
}

export async function connectToDatabase () {
    dotenv.config(); // Loads environment variables from .env file
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONNECT_STRING); // Connects to the database using MongoClient
            
    await client.connect();
        
    db = client.db(process.env.DB_NAME);
   
    // const gameCollectionName = process.env.GAMES_COLLECTION_NAME;
    // if (!gameCollectionName) {
    //     throw new Error("GAMES_COLLECTION_NAME is not defined in .env");
    // }
    // const userCollectionName = process.env.USERS_COLLECTION_NAME;
    // if (!userCollectionName) {
    //     throw new Error("USERS_COLLECTION_NAME is not defined in .env");
    // }
    // const userGamesCollectionName = process.env.USERGAMES_COLLECTION_NAME;
    // if (!userGamesCollectionName) {
    //     throw new Error("USERGAMES_COLLECTION_NAME is not defined in .env");
    // }
    // const gamesCollection: mongoDB.Collection<Game> = db.collection(process.env.GAMES_COLLECTION_NAME!);
    // const usersCollection: mongoDB.Collection<User> = db.collection(process.env.USERS_COLLECTION_NAME!);
    // const userGamesCollection: mongoDB.Collection<UserGame> = db.collection(process.env.USERGAMES_COLLECTION_NAME!);
    await initializeCollections(db, [
        process.env.GAMES_COLLECTION_NAME!,
        process.env.USERS_COLLECTION_NAME!,
        process.env.USERGAMES_COLLECTION_NAME!
    ]);
 
    collections.games = db.collection(process.env.GAMES_COLLECTION_NAME!);
    collections.users = db.collection(process.env.USERS_COLLECTION_NAME!);
    collections.userGames = db.collection(process.env.USERGAMES_COLLECTION_NAME!);
    
    console.log(`Successfully connected to database: ${db.databaseName} and collections: ${collections.games?.collectionName}, ${collections.users?.collectionName}, ${collections.userGames?.collectionName}`);
    
 }

 export function getDb(): mongoDB.Db {
    if (!db) {
        throw new Error("Database not connected!");
    }
    return db;
 }