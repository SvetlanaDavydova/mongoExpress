import { MongoClient } from "mongodb";

const url = "mongodb://Sveta:secret@localhost:27017/";

const mongoClient = new MongoClient(url);

export async function getDBCollection() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("usersdb");
        const collection = db.collection("users");
    
        console.log("Database connected");
        return collection;
    } catch (err){
        console.log(err);
    } finally {
        process.on("SIGINT", async() => {       
            await mongoClient.close();
            console.log("Database disconnected");
            process.exit();
        });
    }
}