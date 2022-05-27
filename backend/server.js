"use strict";
const express = require("express");
const morgan = require("morgan");

const { userLogin } = require("./userLogin");
const { getRandomWord } = require("./getRandomWord");
const { checkValidity } = require("./checkValidity");
const { saveGame } = require("./saveGame");
const { loadGame } = require("./loadGame");
const { getWordList } = require("./getWordList");
const { getSavedGames } = require("./getSavedGames");
const { getUsers } = require("./getUsers");
const { deleteGame } = require("./deleteGame");
const { getUserStats } = require("./getUserStats");
const { addWord } = require("./addWord");

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
