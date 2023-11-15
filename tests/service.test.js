import { jest, describe, expect } from "@jest/globals";
import * as service from '../src/service';

describe("Service", () => {
    let storage;

    beforeAll(() => {
        storage = {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
            mset: jest.fn(),
        };

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

describe('getPlayerStats', () => {
  test('should return player stats from storage', async () => {
    const playerName = 'Luyanda Yohance';
    const playerData = '{\"playerName\":\"Luyanda Yohance\",\"gamesPlayed\":1,\"traditional\":{\"freeThrows\":{\"shootingPercentage\":100,\"made\":6,\"attempts\":6},\"twoPoints\":{\"shootingPercentage\":0,\"made\":0,\"attempts\":4},\"threePoints\":{\"shootingPercentage\":100,\"made\":4,\"attempts\":4},\"rebounds\":1,\"blocks\":1,\"assists\":4,\"steals\":2,\"turnovers\":2,\"points\":18},\"advanced\":{\"valorization\":20,\"effectiveFieldGoalPercentage\":75,\"trueShootingPercentage\":82.9,\"hollingerAssistRatio\":23.7}}';
    
    storage.get.mockResolvedValueOnce(playerData);

    const result = await service.getPlayerStats(storage, playerName);

    expect(result).toEqual(JSON.parse(playerData));
    expect(storage.get).toHaveBeenCalledWith(playerName);
  });

  test('should return an empty object if player not found in storage', async () => {
    const playerName = '404 Player';

    storage.get.mockResolvedValueOnce(null);

    const result = await service.getPlayerStats(storage, playerName);

    expect(result).toEqual({});
    expect(storage.get).toHaveBeenCalledWith(playerName);
  });
});

});