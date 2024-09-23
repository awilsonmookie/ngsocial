/*
    Created: Sep 2024

    Main seeder. 
    TS file that does the work and all to the objects once the process has been started with the NPM call to seed.ts

    The proess will seed the database tables with the information from the object (with referential intergity in place)
*/

// Libraries need to connect to data source, provide the information for seeding the objects (i.e. generating the values)
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

// fakerEL used so that we can have the English localization. Without use it there were localization errors
import { fakerEL } from "@faker-js/faker";

import { User } from './entity/User';
import { Post } from './entity/Post';
import { Comment } from './entity/Comment';
import { Like } from './entity/Like';
import { Notification } from "./entity/Notification";

// create the export for our work and have implement the Seeder
export default class MainSeeder implements Seeder {

    // create method which when read will make the calls to the objects, use the faker to generate the data and then save then to the database
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        
        // create repositories for interacting with the database. These are used since we are not immedialty saving them to the database as we are with users 
        // (immediate save are not made because all the objects will need data from the user object which must be saved first in order to get the ID value)
        const postsRepository = dataSource.getRepository(Post);
        const commentsRepository = dataSource.getRepository(Comment);
        const likesRepository = dataSource.getRepository(Like);
        const notificationsRepository = dataSource. getRepository(Notification);

        // create a factory manager for the user and have it generate two users (this makes a save to DB)
        const userFactory = factoryManager.get(User);
        const users = await userFactory.saveMany(2);

        // create a factory for the post and create an async operation to generate the desired number of post (but not saved to DB yet since the author ID
        // was need to save with it)
        const postsFactory = factoryManager.get(Post);
        const posts= await Promise.all(
            Array(17)                                               // the number of items to be created
                .fill("")
                .map(async () => {
                    const made = await postsFactory.make({
                        author: fakerEL.helpers.arrayElement(users) // use the user objects to get the author information in order to use it to set up the link
                    });
                    return made;
                }),
        );
        // save to database
        await postsRepository.save(posts);

        // repeat the same pattern for comments. Need both the user and post objects in order to establish link
        const commentsFactory = factoryManager.get(Comment);
        const comments = await Promise.all(
            Array(17)
            .fill("")
            .map(async () => {
                const made = await commentsFactory.make({
                    author: fakerEL.helpers.arrayElement(users),
                    post: fakerEL.helpers.arrayElement(posts)
                });
                return made;
            }),               
        );
        await commentsRepository.save(comments);

        const likesFactory = factoryManager.get(Like);
        const likes = await Promise.all(
            Array(17)
            .fill("")
            .map(async () => {
                const made = await likesFactory.make({
                    author: fakerEL.helpers.arrayElement(users),
                    post: fakerEL.helpers.arrayElement(posts)
                });
                return made;
            }),               
        );
        await likesRepository.save(likes);   
        
        const notificationsFactory = factoryManager.get(Notification);
        const notifications = await Promise.all(
            Array(17)
            .fill("")
            .map(async () => {
                const made = await notificationsFactory.make({
                    author: fakerEL.helpers.arrayElement(users)
                });
                return made;
            }),               
        );
        await notificationsRepository.save(notifications);         
    }
}