// types/custom.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      DB_CONNECT_STRING: string;
      DB_NAME: string;
      GAMES_COLLECTION_NAME: string;
      USERS_COLLECTION_NAME: string;
      USERGAMES_COLLECTION_NAME: string;
      PORT?: string;
    }
}