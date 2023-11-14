import express from "express";
import routes from "./routes.js";
import * as service from "./service.js";
import storage from "./storage.js";

const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;

app.use("/stats", routes);

await service.loadPlayerStats(storage, "data/data.csv");

app.listen(port, function () {
    console.log("Player stats service listening on port %d.", port);
});