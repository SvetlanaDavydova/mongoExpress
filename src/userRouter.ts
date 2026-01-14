import { Router } from 'express';
import { ObjectId as objectId } from "mongodb";
import { getDBCollection } from "./mongoconnect";

export const router = Router();
const usersCollection= await getDBCollection();

router.get("/:id", async (request, response) => {
    const userId = new objectId(request.params.id);

    const user = await (await usersCollection).findOne({ _id: userId });

    if (!user) { 
       return response.status(400).send("User not found");
    }

    response.send(user);
});

router.post('/', async (request, response) => {

    if(!request.body) { 
        return response.status(400).send('User Info not found');
    }

    const username = request.body.name;
    const userAge = request.body.age;
    const user = {
        name: username,
        age: userAge
    };

    const result = await (await usersCollection).insertOne(user);
    response.json(result);
});

router.delete("/:id", async (request, response) => {
    const id = new objectId(request.params.id);
    if (!id) { 
        return response.send("Param id was not found");
    }

    const user = await (await usersCollection).findOneAndDelete({ _id: id });
    if (!user) { 
        return response.status(400).send("User with that id not found");
    }

    response.send(user);
})

router.put('/', async (request, response) => {
    if(!request.body) { 
        return response.status(400).send('User info not found');
    }

    const userName = request.body.name;
    const userAge = request.body.age;
    const userId = new objectId(request.body.id);

    const user = await (await usersCollection).
        findOneAndUpdate(
            { _id: userId },
            { $set: { name: userName, age: userAge }},
            { returnDocument: "after" }
        );

    if (!user) { 
       return response.status(400).send("User with that id was not found");
    }

    response.json(user);
});

router.get("/", async (request, response) => {
    const users = await (await usersCollection).find().toArray();
    response.send(users);
});
