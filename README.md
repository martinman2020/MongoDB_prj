# API Documentation

## Base URL

`http://localhost:8080/api`

## Setup Instructions

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Build the server with `npm run build`.
4. Start the server with `npm run start`.

## Environment Variables

- `DB_CONNECT_STRING`: Your MongoDB connection string.
- `DB_NAME`: Name of the database.
- `GAMES_COLLECTION_NAME`, `USERS_COLLECTION_NAME`, `USERGAMES_COLLECTION_NAME`: Names of the collections.
- `PORT`

## Endpoints

### Relationship Collection: userGames

#### Get All User-Game Relationships

- **URL**: `/user-games`
- **Method**: `GET`
- **Description**: Retrieves all user-game relationships.
- **Response**:
  - `200 OK`: A JSON array of relationships.
  - Example:
    ```json
    [
      {
        "_id": "66dfafdb5d0aae93fb3bf816",
        "userId": "66deabdd5f852f9c71451c63",
        "gameId": "66dfafdb5d0aae93fb3bf815"
      }
    ]
    ```
#### Create a New User-Game Relationship
- **URL**: `/user-games`
- **Method**: `POST`
- **Description**: Create a new relationship between a user and a game.
- **Request Body**:
  - Content-Type: application/json
  - Example:
    ```json
    {
      "username": "Ken",
      "email": "ken@example.com",
      "gameData": {
        "name": "Genshin Impact",
        "price": 55,
        "category": "RPG",
        "releaseYear": 2010
      }
    }
    ```
- **Response**:
  - `201 Created`: If the relationship is successfully created.
  - Example:
  ```html
  Game: "Genshin Impact" and relationship 
  (userId: "66deca2e5f852f9c71451c64" & gameId: "66dfdf45e2b1efaa054129c2") inserted successfully
  ```

#### Get All Users with Games

- **URL**: `/users/games`
- **Method**: `GET`
- **Description**: Retrieves a list of all users and the games they own.
- **Response**:
  - `200 OK`: A JSON array of users with their games.
  - Example:
    ```json
    [
      {
          "_id": "66deca2e5f852f9c71451c67",
          "username": "dave",
          "games": [
              "Legend",
              "World of Warcraft",
              "Valorant"
          ]
      },
      {
          "_id": "66deca2e5f852f9c71451c64",
          "username": "Ken",
          "games": [
              "Valorant",
              "Legend",
              "H1Z1"
          ]
      },
      {
          "_id": "66deabdd5f852f9c71451c63",
          "username": "alice",
          "games": [
              "Elden Ring",
              "Legend"
          ]
      }
    ]
    ```

#### Get Games for a Specific User

- **URL**: `/users/:userId/games`
- **Method**: `GET`
- **Description**: Retrieves a list of games owned by a specific user.
- **Parameters**:
  - `_id`: The ID of the user.
- **Response**:
  - `200 OK`: A JSON object with the user's games.
  - Example:
    ```json
    [
      {
          "_id": "66deca2e5f852f9c71451c67",
          "username": "dave",
          "games": [
              "Legend",
              "World of Warcraft",
              "Valorant"
          ]
      }
    ]
    ```
### Users Collection

- **Description**: User data is populated internally via the backend.
- **Method**: db.users.insertMany({})
- **Details**:
  This is done during the server setup or as part of a data seeding process.
  - Example:
  ```text
  db.users.insertMany([
    {
      "username": "Ken",
      "email": "ken@example.com",
      "age": 28
    },
    {
      "username": "dave",
      "email": "dave@example.com",
      "age": 30
    }
  ]);
  ```
### Games Collection

#### Get All Games

- **URL**: `/games`
- **Method**: `GET`
- **Description**: Retrieves a list of all games.
- **Response**:
  - `200 OK`: A JSON array of games.
  - Example:
    ```json
    [
      {
        "_id": "66dfafdb5d0aae93fb3bf815",
        "name": "Elden Ring",
        "price": 99,
        "category": "RPG",
        "releaseYear": 2017
      },
      {
          "_id": "66dfc8575d0aae93fb3bf819",
          "name": "World of Warcraft",
          "price": 78,
          "category": "MMORPG",
          "releaseYear": 2012
      },
      {
          "_id": "66dfd6db82c4a7d32ad00b30",
          "name": "Valorant",
          "price": 30,
          "category": "shooting game",
          "releaseYear": 2015
      }
    ]
    ```
#### Create a New Game

- **URL**: `/games`
- **Method**: `POST`
- **Description**: Adds a new game to the collection.
- **Request Body**:
  - Content-Type: `application/json`
  - Example:
    ```json
    {
      "name": "PUBG",
      "price": 107,
      "category": "shooting game",
      "releaseYear": 2018
    }
    ```
- **Response**:
  - `201 Created`: If the game is successfully added.
  - Example:
    ```html
    Game id: 66dfe5aae8f7f926b1a982f9 created successfully!
    ```
#### Update a Game

- **URL**: `/games/:id`
- **Method**: `PUT`
- **Description**: Updates details of an existing game.
- **Request Body**:
  - Content-Type: `application/json`
  - Example:
    ```json
    {
      "price": 200
    }
    ```
- **Response**:
  - `200 OK`: If the game is successfully updated.
  - Example:
    ```html
    Successfully updated game with id 66dfe5aae8f7f926b1a982f9
    ```

#### Delete a Game

- **URL**: `/games/:gameId`
- **Method**: `DELETE`
- **Description**: Removes a game from the collection.
- **Response**:
  - `202 Accepted`: If the game is successfully deleted.
  - Example:
    ```html
    Sucessfully deleted game with id: 66def1d43aca914b7f6ba2bd
    ```

## Error Handling

- `404 Not Found`: If the user is not found.
- `500 Internal Server Error`: If there is a server error.
