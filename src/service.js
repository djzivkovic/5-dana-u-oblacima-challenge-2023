import * as fs from "fs";
import * as parser from "./parser.js";

export async function getPlayerStats(storage, playerName) {
    const player = await storage.get(playerName);
    if (!player) return {};
    return JSON.parse(player);
}

export async function loadPlayerStats(storage, filePath) {
    const rawData = fs.readFileSync(filePath, "utf8");
    const parsedStats = await parser.parsePlayerStats(rawData);
    storage.mset(parsedStats);
}