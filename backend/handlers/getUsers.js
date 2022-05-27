require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const dbName = "frankle";
    const collectionName = "users";

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log("Connected to DB: " + dbName);

        const users = await db.collection(collectionName).find().toArray();

        console.log("returning users... ");

        return res.status(200).json({ status: 200, users: users });
    } catch (err) {
        console.log("getUsers caught error: ");
        console.log(err.message);

        return res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();

        console.log("Disconnected.");
    }
};

module.exports = { getUsers };
