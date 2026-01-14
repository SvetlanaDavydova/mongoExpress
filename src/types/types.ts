import { ObjectId } from "mongodb"

export interface UserMeta {
    age: number,
    name: string
}

export interface UserMetaDb extends UserMeta {
    _id: ObjectId
}

export interface User extends UserMeta {
    id: string
}