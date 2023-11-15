import { parsePlayerStats } from '../src/parser';

describe("Parser", () => {
    describe('parsePlayerStats', () => {
    test('should parse player stats correctly', async () => {
        const rawData = 'PLAYER,POSITION,FTM,FTA,2PM,2PA,3PM,3PA,REB,BLK,AST,STL,TOV\nLuyanda Yohance,PG,6,6,0,4,4,4,1,1,4,2,2\nAboki Siyabonga,PF,0,0,0,0,0,0,0,0,0,0,0';
        
        const result = await parsePlayerStats(rawData);

        expect(result).toEqual({
        'Luyanda Yohance': '{\"playerName\":\"Luyanda Yohance\",\"gamesPlayed\":1,\"traditional\":{\"freeThrows\":{\"shootingPercentage\":100,\"made\":6,\"attempts\":6},\"twoPoints\":{\"shootingPercentage\":0,\"made\":0,\"attempts\":4},\"threePoints\":{\"shootingPercentage\":100,\"made\":4,\"attempts\":4},\"rebounds\":1,\"blocks\":1,\"assists\":4,\"steals\":2,\"turnovers\":2,\"points\":18},\"advanced\":{\"valorization\":20,\"effectiveFieldGoalPercentage\":75,\"trueShootingPercentage\":82.9,\"hollingerAssistRatio\":23.7}}',
        'Aboki Siyabonga': '{\"playerName\":\"Aboki Siyabonga\",\"gamesPlayed\":1,\"traditional\":{\"freeThrows\":{\"shootingPercentage\":0,\"made\":0,\"attempts\":0},\"twoPoints\":{\"shootingPercentage\":0,\"made\":0,\"attempts\":0},\"threePoints\":{\"shootingPercentage\":0,\"made\":0,\"attempts\":0},\"rebounds\":0,\"blocks\":0,\"assists\":0,\"steals\":0,\"turnovers\":0,\"points\":0},\"advanced\":{\"valorization\":0,\"effectiveFieldGoalPercentage\":0,\"trueShootingPercentage\":0,\"hollingerAssistRatio\":0}}'
        });
    });
    });
});