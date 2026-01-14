import { ObjectId } from "mongodb";
import { USERS_COLLECTION, USERS_DB_NAME } from "../constants/db.js";
import { getMongoClient } from "../helpers/mongoClient.js";
import { UserMeta, UserMetaDb } from "../types/types.js";

export const getUser = async(id:string) => 
    (await getMongoClient()).db(USERS_DB_NAME).collection(USERS_COLLECTION)
        .findOne<UserMetaDb>({_id: getObjectId(id)});

export const createUser = async(user: UserMeta) => 
    (await getMongoClient()).db(USERS_DB_NAME).collection(USERS_COLLECTION)
        .insertOne(user);

export const deleteUser = async(id: string) =>
    (await getMongoClient()).db(USERS_DB_NAME).collection(USERS_COLLECTION)
        .deleteOne({_id: getObjectId(id)});

export const updateUser = async(id:string, data: UserMeta) =>
    (await getMongoClient()).db(USERS_DB_NAME).collection(USERS_COLLECTION)
    .findOneAndUpdate(
        { _id: getObjectId(id) },
        { $set: data },
        { returnDocument: "after" }
    )

export const getAllUsers = async() =>
    (await getMongoClient()).db(USERS_DB_NAME).collection(USERS_COLLECTION)
        .find().toArray();

const getObjectId = (id: string): ObjectId => new ObjectId(id);
