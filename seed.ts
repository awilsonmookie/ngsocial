/*
    Created Sep 2024
    Based on information found in TYPEORM and Faker article: https://www.devist.xyz/posts/how-to-seed-a-database-with-type-orm-and-faker-in-2024

    This is the typescript file ran by npm and makes the call to the individual factories and uses the objects to seed the database

    This should be ran when development work is getting done on a local version and test data is needed
*/

import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";

// Objects to use for database population
import { User } from './entity/User';
import { Post } from './entity/Post';
import { Comment } from './entity/Comment';
import { Like } from './entity/Like';
import { Notification } from "./entity/Notification";

// Factories of each of the objects
import { UsersFactory } from "./factory/user.factory";
import { PostsFactory } from "./factory/posts.factory";
import { CommentsFactory } from "./factory/comments.factory";
import { LikesFactory } from "./factory/likes.factory";
import { NotificationsFactory } from "./factory/notifications.factory";

// main seeder 
import  MainSeeder  from "./seeder";

// constants for database
const {
    DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
} = process.env;

// connection string information and the seeder options
const options: DataSourceOptions & SeederOptions = {
    type: "mysql",
    host: DB_HOST || "localhost",
    port: Number(DB_PORT) || 3306,
    username: DB_USER || "devUseer",
    password: DB_PASSWORD || "devUser357",
    database: DB_NAME || "angdev",
    entities: [User, Post, Comment, Like, Notification],
    factories: [UsersFactory, PostsFactory, CommentsFactory, LikesFactory, NotificationsFactory],
    seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

// initialize and make the aync call
dataSource.initialize().then(async () => {
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit();
})