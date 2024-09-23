import { fakerEL } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Notification }  from '../entity/Notification';

export const NotificationsFactory = setSeederFactory(Notification, (fakerEL) => {
    const notification = new Notification();

    notification.createdAt = fakerEL.date.anytime();
    notification.text = fakerEL.word.words({count:20});
    notification.postId = fakerEL.number.int({min: 1, max: 5});
  
    return notification;
});