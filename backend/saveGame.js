require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const saveGame = async (req, res) => {
    console.log("Got game: ");
    console.dir(req.body);

    const client = new MongoClient(MONGO_URI, options);
    const dbName = "frankle";
    const collectionName = "savedgames";

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log("Connected to DB:" + dbName);

        // if this userId / word pair already exists, update it
        // else, create it

        const existingSavedGame = await db.collection(collectionName).findOne({
            userId: req.body.userId,
            word: req.body.word,
        });

        if (existingSavedGame) {
            const resultOfUpdate = await db
                .collection(collectionName)
                .updateOne(
                    { _id: existingSavedGame._id },
                    {
                        $set: {
                            guesses: req.body.guesses,
                            onRow: req.body.onRow,
                            gameOver: req.body.gameOver,
                            gameWon: req.body.gameWon,
                            updated: new Date(),
                        },
                    }
                );
            console.log("got resultOfUpdate: ");
            console.log(resultOfUpdate);
            return res
                .status(200)
                .json({ status: 200, message: "updated existing saved game" });
        } else {
            const resultOfInsert = await db
                .collection(collectionName)
                .insertOne({
                    _id: uuidv4().substring(28, 37),
                    ...req.body,
                    started: new Date(),
                    updated: new Date(),
                });

            console.log("got resultOfInsert: ");
            console.log(resultOfInsert);
            return res
                .status(200)
                .json({ status: 200, message: "new game saved" });
        }
    } catch (err) {
        console.log("saveGame caught error: ");
        console.log(err.message);

        return res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();

        console.log("Disconnected.");
    }
};

module.exports = { saveGame };
