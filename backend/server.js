"use strict";
const express = require("express");
const morgan = require("morgan");

const { userLogin } = require("./userLogin");
const { getRandomWord } = require("./getRandomWord");
const { checkValidity } = require("./checkValidity");
const { saveGame } = require("./saveGame");

express()
    .use(morgan("tiny"))
    .use(express.json())

    // Any requests for static files will go into the public folder
    .use(express.static("public"))

    // endpoints here
    .post("/api/userlogin", userLogin)
    .get("/api/randomword", getRandomWord)
    .post("/api/checkvalidity", checkValidity)
    .post("/api/savegame", saveGame)

    // catch all endpoint.
    .get("*", (req, res) => {
        res.status(404).json({
            status: 404,
            message: "There does not seem to be anything here.",
        });
    })

    .listen(8000, () => console.log(`Listening on port 8000`));
