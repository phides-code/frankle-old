require('dotenv').config();
const { MongoClient } = require('mongodb');
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const { v4: uuidv4 } = require('uuid');

const scores = [
    {
        initials: 'phi',
        time: '00002399',
    },
    {
        initials: 'ddd',
        time: '00002699',
    },
    {
        initials: 'zsx',
        time: '00002999',
    },
    {
        initials: 'elb',
        time: '00003999',
    },
    {
        initials: 'pok',
        time: '00004999',
    },
    {
        initials: 'aws',
        time: '00005999',
    },
    {
        initials: 'lab',
        time: '00010299',
    },
    {
        initials: 'bbb',
        time: '00014399',
    },
    {
        initials: 'aaa',
        time: '00022399',
    },
    {
        initials: 'abc',
        time: '00024399',
    },
];

const insertScores = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const dbName = 'frankle';
    const collectionName = 'besttimes';
    const numOfBestTimes = 10;

    scores.forEach((score) => {
        score._id = uuidv4();
        score.initials = score.initials.toUpperCase();
    });

    try {
        await client.connect();
        const db = client.db(dbName);
        console.log('Connected to DB: ' + dbName);

        const insertResult = await db
            .collection(collectionName)
            .insertMany(scores);

        console.log('got insertResult: ');
        console.log(insertResult);
    } catch (err) {
        console.log('insertScores caught error: ');
        console.log(err.message);
    } finally {
        client.close();

        console.log('Disconnected.');
    }
};

insertScores();
