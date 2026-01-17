import { MongoClient } from "mongodb";

let client: Promise<MongoClient>;

export const getMongoClient = async () : Promise<MongoClient> => {
    if (client) {
        return client;
    }

    client = new Promise (async (resolve, reject) => {
        try {
            const connectionString = getConnectionString();

            const client = await MongoClient.connect(connectionString);
            resolve(client);
        } catch (error) {
            console.log("Mongo client error ", error);
            throw error;
        }
    });

    return client;
}

const getConnectionString = (): string => {
    return process.env.MONGO_DB_URI;
}