require('dotenv').config();
const { MongoClient } = require('mongodb');
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getBestTimes = async (req, res) => {
    // console.log('Checking high score: ');
    // console.dir(req.body);

    const client = new MongoClient(MONGO_URI, options);
    const dbName = 'frankle';
    const collectionName = 'besttimes';
    // const numOfBestTimes = 10;

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log('Connected to DB: ' + dbName);

        const bestTimes = await db
            .collection(collectionName)
            .find({})
            .toArray();

        // if (bestTimes.length < 10) {
        //     // add this time
        //     console.log('add this time');
        // } else if (req.body.time > bestTimes[numOfBestTimes - 1]) {
        //     // add this time
        //     console.log('add this time');
        // } else {
        //     // no high score
        //     console.log('no high score');
        // }

        return res.status(200).json({ status: 200, bestTimes });
    } catch (err) {
        console.log('getBestTimes caught error: ');
        console.log(err.message);

        return res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();

        console.log('Disconnected.');
    }
};

module.exports = { getBestTimes };
