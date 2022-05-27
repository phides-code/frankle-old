"use strict";
const express = require("express");
const morgan = require("morgan");

const { userLogin } = require("./handlers/userLogin");
const { getRandomWord } = require("./handlers/getRandomWord");
const { checkValidity } = require("./handlers/checkValidity");
const { saveGame } = require("./handlers/saveGame");
const { loadGame } = require("./handlers/loadGame");
const { getWordList } = require("./handlers/getWordList");
const { getSavedGames } = require("./handlers/getSavedGames");
const { getUsers } = require("./handlers/getUsers");
const { deleteGame } = require("./handlers/deleteGame");
const { getUserStats } = require("./handlers/getUserStats");
const { addWord } = require("./handlers/addWord");

express()
    .use(morgan("tiny"))
    .use(express.json())

    // Any requests for static files will go into the public folder
    .use(express.static("public"))

    // endpoints here
    .get("/api/wordlist", getWordList)
    .get("/api/savedgames", getSavedGames)
    .get("/api/users", getUsers)
    .get("/api/randomword", getRandomWord)
    .post("/api/userstats", getUserStats)
    .post("/api/userlogin", userLogin)
    .post("/api/checkvalidity", checkValidity)
    .post("/api/savegame", saveGame)
    .post("/api/loadgame", loadGame)
    .post("/api/addword", addWord)
    .delete("/api/deletegame", deleteGame)

    // catch all endpoint.
    .get("*", (req, res) => {
        res.status(404).json({
            status: 404,
            message: "There does not seem to be anything here.",
        });
    })

    .listen(8000, () => console.log(`Listening on port 8000`));
