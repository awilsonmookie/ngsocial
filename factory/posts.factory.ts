import { fakerEL } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Post }  from '../entity/Post'

export const PostsFactory = setSeederFactory(Post, (fakerEL) => {
    const post = new Post();

    post.text = fakerEL.word.words({count:25});
    post.image = fakerEL.image.avatar();
    post.commentsCount = fakerEL.number.int({min: 1, max: 5});
    post.likesCount = fakerEL.number.int({min: 1, max: 5});
    post.latestLike = fakerEL.word.words({count:5});
    post.createdAt = fakerEL.date.anytime();
    post.likedByAuthUser = fakerEL.datatype.boolean(0.9);
    
    return post;
});