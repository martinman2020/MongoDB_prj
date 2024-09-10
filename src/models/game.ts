//game.ts
// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
export interface Game {
    _id?: ObjectId,
    name: string, 
    price: number, 
    category: string,
    releaseYear: number
}