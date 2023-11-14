export async function getPlayerStats(storage, playerName) {
    const player = await storage.get(playerName);
    if (!player) return {};
    return JSON.parse(player);
}

export async function loadPlayerStats(storage, fileName) {
    
}

async function setPlayerStats(storage, playerName, playerStats) {
    await storage.set(playerName, JSON.stringify(playerStats));
}