import express from "express";
import * as service from "./service.js";
import storage from "./storage.js";
const router = express.Router();

// Player stats endpoint
router.get("/player/:name", async (req, res) => {
    const playerName = req.params["name"];
    const playerStats = await service.getPlayerStats(storage, playerName);
    if(Object.keys(playerStats).length == 0) {
        res.status(404);
        return res.json({message: "Player not found."});
    }
    return res.json({playerStats});
});

export default router;