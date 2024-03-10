import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"

const db_uri = 'mongodb+srv://22bce308:rushil@cluster0.u7lqdbn.mongodb.net/sample_restaurants?retryWrites=true&w=majority&appName=Cluster0'

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000;
console.log(port);
MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
    // poolSize: 1,
    // wtimeoutMS: 2500,
    // useNewUrlParser: true // Corrected option name
})
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    });