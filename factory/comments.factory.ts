import { fakerEL } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Comment }  from '../entity/Comment';

export const CommentsFactory = setSeederFactory(Comment, (fakerEL) => {
    const comment = new Comment();

    comment.comment = fakerEL.word.words({count:25});
    comment.createdAt = fakerEL.date.anytime();
  
    return comment;
});