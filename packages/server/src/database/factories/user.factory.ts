import { Faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { User } from '../../entity/User';


define(User,  (faker: Faker) =>{
    const user = new User()
    user.fullName = faker.name.fullName();
    user.bio = faker.lorem.sentence();
    user.email = faker.internet.email();
    user.username = faker.internet.userName();
    user.password = faker.internet.password();
    user.image = faker.image.imageUrl();
    user.coverImage = faker.image.imageUrl();
    user.postsCount = 200;
    user.createdAt = faker.date.past();
    return user;
});



