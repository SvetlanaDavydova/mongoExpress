import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from './profile/index.js';

export const router = Router();

router.get("/:id", async (request, response) => {
    const userId = request.params.id as string;

    const user = await getUser(userId);
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

    const result = await createUser(user);
    response.json(result);
});

router.delete("/:id", async (request, response) => {
    const id = request.params.id;
    if (!id) { 
        return response.send("Param id was not found");
    }

    const user = await deleteUser(id);
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
    const userId = request.body.id;

    const user = await updateUser(userId, { name: userName, age: userAge });

    if (!user) { 
       return response.status(400).send("User with that id was not found");
    }

    response.json(user);
});

router.get("/", async (request, response) => {
    const users = await getAllUsers();
    response.send(users);
});
