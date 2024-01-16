import { Faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { Like } from '../../entity/Like';

define( Like, (faker: Faker) => {
    const like = new Like();
    like.createdAt = faker.date.past();

    return like;
});