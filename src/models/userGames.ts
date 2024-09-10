import { ObjectId } from "mongodb";


export interface UserGame {
    userId: ObjectId;
    gameId: ObjectId;
}