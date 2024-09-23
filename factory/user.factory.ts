import { fakerEL } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { User }  from '../entity/User'


export const UsersFactory = setSeederFactory(User, (fakerEL ) => {
    const user = new User();

    user.fullname = fakerEL.person.fullName({firstName: 'Allen', lastName: 'Wilson' });
    user.bio = fakerEL.word.words({count:20});
    user.email = fakerEL.internet.exampleEmail({ firstName: 'allen', lastName: 'wilson', allowSpecialCharacters: true });
    user.username = fakerEL.internet.userName({ firstName: 'allen', lastName: 'Wilson' });
    user.password = fakerEL.internet.password({ length: 20, memorable: true });
    user.image = fakerEL.image.avatar();
    user.coverImage = fakerEL.image.avatar();
    user.postsCount= fakerEL.number.int({min: 1, max: 5})
    user.createdAt = fakerEL.date.anytime();

    return user;
});