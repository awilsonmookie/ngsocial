import { fakerEL } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Like }  from '../entity/Like';


export const LikesFactory = setSeederFactory(Like, (fakerEL) => {
    const like = new Like();

    like.createdAt = fakerEL.date.anytime();
  
    return like;
});