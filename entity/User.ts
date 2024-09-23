import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";
import { OneToMany } from "typeorm";
import { Post} from './Post';
import { Comment } from './Comment';
import { Like } from './Like';
import { Notification } from "./Notification";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname:string;

    @Column("text", {nullable: true}) 
    bio: string;

    @Column({ unique: true})
    email: string;

    @Column({ unique: true})
    username: string;

    @Column()
    password: string;

    @Column({ nullable: true }) 
    image: string;

    @Column({ nullable: true }) 
    coverImage: string;

    @Column( { default: 0})
    postsCount: number;

    @CreateDateColumn() 
    createdAt: Date;

    @OneToMany(() => Post, (post) => post.author) post?: Post[]
    @OneToMany(() => Comment, (comment) => comment.author) comment?: Comment[]
    @OneToMany(() => Like, (like) => like.author) likes?: Like[]
    @OneToMany(() => Notification, (notification) => notification.author) notifications?: Notification[]
}