import { parse } from "csv-parse/sync";

const mapping = {
    "PLAYER": "playerName",
    "POSITION": "position",
    "FTM": "freeThrows.made",
    "FTA": "freeThrows.attempts",
    "2PM": "twoPoints.made",
    "2PA": "twoPoints.attempts",
    "3PM": "threePoints.made",
    "3PA": "threePoints.attempts",
    "REB": "rebounds",
    "BLK": "blocks",
    "AST": "assists",
    "STL": "steals",
    "TOV": "turnovers",
    "GAMES": "gamesPlayed",
  };

export async function parsePlayerStats(rawData) {
    const rows = parse(rawData, {
        columns: true,
        skip_empty_lines: true,
    });

    const playerStatsMap = new Map();

    for (const row of rows) {
        const playerName = row[Object.keys(row)[0]];
        const playerPosition = row[Object.keys(row)[1]];
        if (!playerStatsMap.has(playerName)) {
            playerStatsMap.set(playerName, {
                "PLAYER": playerName,
                "POSITION": playerPosition,
                "GAMES": 0,
                "FTM": 0,
                "FTA": 0,
                "2PM": 0,
                "2PA": 0,
                "3PM": 0,
                "3PA": 0,
                "REB": 0,
                "BLK": 0,
                "AST": 0,
                "STL": 0,
                "TOV": 0,
            });
        }
        const playerStats = playerStatsMap.get(playerName);
        playerStats["GAMES"]++;
        
        for (const [key, value] of Object.entries(row)) {
            if (isNaN(Number(value))) continue;
            playerStats[key] += Number(value);
        }
    }

    const result = {};

    for (const [playerName, stats] of playerStatsMap.entries()) {
        const mappedStats = mapBasicStats(stats);
        const basicDerivedStats = calculateBasicDerivedStats(mappedStats);

        const playerInfo = {
            playerName: mappedStats.playerName,
            position: mappedStats.position,
            gamesPlayed: mappedStats.gamesPlayed,
        };

        delete mappedStats.playerName;
        delete mappedStats.position;
        delete mappedStats.gamesPlayed;

        const traditionalStats = {...mappedStats, ...basicDerivedStats};
        const advancedDerivedStats = calculateAdvancedDerivedStats(traditionalStats);

        const fullPlayerStats = {
            ...playerInfo,
            traditional: traditionalStats,
            advanced: advancedDerivedStats
        };

        result[fullPlayerStats.playerName] = JSON.stringify(fullPlayerStats, (k, val) => {
            return val.toFixed ? Number(val.toFixed(1)) : val;
        });
    }
    return result;
}

function mapBasicStats(stats) {
    const result = {};
    for (const [key, value] of Object.entries(stats)) {
        if (!mapping.hasOwnProperty(key)) {
            throw new Error(`Unknown column name: ${key}`);
        }
        const targetKey = mapping[key];
        const nestedKeys = targetKey.split('.');
        let currentResult = result;
    
        for (let i = 0; i < nestedKeys.length - 1; i++) {
          currentResult = currentResult[nestedKeys[i]] = currentResult[nestedKeys[i]] || {};
        }
    
        currentResult[nestedKeys[nestedKeys.length - 1]] = typeof value == "number" && key != "GAMES" ? value / stats["GAMES"] : value;
    }
    return result;
}


function calculateBasicDerivedStats(stats) {
    return {
        points: stats.freeThrows.made + stats.twoPoints.made * 2 + stats.threePoints.made * 3,
        freeThrows: {
            shootingPercentage: ((stats.freeThrows.made / stats.freeThrows.attempts) * 100) || 0,
            made: stats.freeThrows.made,
            attempts: stats.freeThrows.attempts,
        },
        twoPoints: {
            shootingPercentage: ((stats.twoPoints.made / stats.twoPoints.attempts) * 100) || 0,
            made: stats.twoPoints.made,
            attempts: stats.twoPoints.attempts,
        },
        threePoints: {
            shootingPercentage: ((stats.threePoints.made / stats.threePoints.attempts) * 100) || 0,
            made: stats.threePoints.made,
            attempts: stats.threePoints.attempts,
        },
    }
}

function calculateAdvancedDerivedStats(stats) {
    return {
        valorization: stats.points + stats.rebounds + stats.assists + stats.steals + stats.blocks -
        (stats.freeThrows.attempts - stats.freeThrows.made) - (stats.twoPoints.attempts - stats.twoPoints.made) - 
        (stats.threePoints.attempts - stats.threePoints.made) - stats.turnovers,

        effectiveFieldGoalPercentage: (((stats.twoPoints.made + 1.5 * stats.threePoints.made) / (stats.twoPoints.attempts + stats.threePoints.attempts)) * 100) || 0,

        trueShootingPercentage: (stats.points / (2 * (stats.twoPoints.attempts +  
            stats.threePoints.attempts + 0.475 * stats.freeThrows.attempts)) * 100) || 0,

        hollingerAssistRatio: (stats.assists / (stats.twoPoints.attempts + stats.threePoints.attempts +
             0.475 * stats.freeThrows.attempts + stats.assists + stats.turnovers) * 100) || 0,
    }
}