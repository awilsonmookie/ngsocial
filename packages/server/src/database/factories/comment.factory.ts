import { Faker } from '@faker-js/faker';
import { define, factory } from 'typeorm-seeding';
import { Comment } from '../../entity/Comment';

define(Comment, (faker: Faker) => {
    const comment = new Comment();
    comment.comment = faker.lorem.text();
    comment.createdAt = faker.date.past();

    return comment;
});