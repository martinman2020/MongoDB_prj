import { ObjectId } from 'mongodb';
import { Game } from '../src/models/game';

describe('Game Class', () => {
    it('should create a game instance with the correct properties', () => {
      const id = new ObjectId();
      const game: Game = {
        _id: id,
        name: 'Chess',
        price: 0,
        category: 'Board',
        releaseYear: 2024
      };
  
      expect(game._id).toBe(id);
      expect(game.name).toBe('Chess');
      expect(game.price).toBe(0);
      expect(game.category).toBe('Board');
      expect(game.releaseYear).toBe(2024);
    });
  });





