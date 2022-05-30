"use strict";
const express = require("express");
const morgan = require("morgan");
const path = require("path");

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
const { getSavedGamesByUser } = require("./handlers/getSavedGamesByUser");

const PORT = process.env.PORT || 8000;

express()
    .use(morgan("tiny"))
    .use(express.json())

    // Requests for static files go to public folder
    // .use(express.static("public"))

    // Have Node serve the files for our built React app
    .use(express.static(path.resolve(__dirname, "../frontend/build")))

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
    .post("/api/savedgamesbyuser", getSavedGamesByUser)
    .delete("/api/deletegame", deleteGame)

    // catch all endpoint
    // .get("*", (req, res) => {
    //     res.status(404).json({
    //         status: 404,
    //         message: "There does not seem to be anything here.",
    //     });
    // })

    .get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../frontend/build", "index.html")
        );
    })

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));
