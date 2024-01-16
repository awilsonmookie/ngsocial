import { Seeder, Factory} from 'typeorm-seeding';
import { User } from '../../entity/User';
import { Post } from '../../entity/Post';
import { Comment } from '../../entity/Comment';
import { Like } from '../../entity/Like';
import { Notification } from '../../entity/Notification';

export default class CreateUsers implements Seeder{

    public async run(factory: Factory): Promise<void> {

        // create the user object and mapping
        await   factory(User)().map(async (user:User) => {

            //create the comments for the user
            const comments: Comment[] = await factory(Comment)().map(async(comment: Comment) => {
                comment.author = await factory(User)().create();
                return comment;
            }).createMany(Math.floor(Math.random() * 10) +1 );

            // create the likes for the user
            const likes: Like[] = await factory(Like)().map(async (like: Like) => {
                like.user = await factory(User)().create();
                return like;
            }).createMany(Math.floor(Math.random() * 10) +1 );      
            
            // create the posts
            const userPosts: Post[] = await factory(Post)().map(async (post: Post) => {
                post.comments = comments;
                post.likes = likes;
                post.latestComment = await factory(Comment)().map(async (comment: Comment) => {
                    comment.author = await factory(User)().create();
                    return comment;
                }).create();
                return post;
            }).createMany(Math.floor(Math.random() * 10) +1 );  

            // create the notifications

            return user;
        })
        // create 15 users
        .createMany(15);
    }
}