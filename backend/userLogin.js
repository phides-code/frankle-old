require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const userLogin = async (req, res) => {
    console.log("Logging in user: " + req.body.nickname);

    const client = new MongoClient(MONGO_URI, options);
    const dbName = "frankle";
    const collectionName = "users";
    try {
        await client.connect();
        const db = client.db(dbName);
        console.log("Connected to DB:" + dbName);

        const foundUser = await db
            .collection(collectionName)
            .findOne({ _id: req.body.email });

        if (foundUser) {
            console.log("User already in DB");
            return res
                .status(200)
                .json({ status: 200, message: "User already in DB" });
        } else {
            console.log("Adding new user to DB...");

            const resultOfInsert = await db
                .collection(collectionName)
                .insertOne({
                    _id: req.body.email,
                    ...req.body,
                });

            console.log("got resultOfInsert: ");
            console.log(resultOfInsert);
            return res
                .status(200)
                .json({ status: 200, message: "Adding new user to DB..." });
        }
    } catch (err) {
        console.log("userLogin caught error: ");
        console.log(err.message);
        return res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
        console.log("Disconnected.");
    }
};

module.exports = { userLogin };
