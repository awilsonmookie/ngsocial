import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from "typeorm";
import { User } from './User';
import { Post} from './Post';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text") 
    comment: string   

    @CreateDateColumn() 
    createdAt: Date   

    @ManyToOne(() => User, (user) => user.comment, { onDelete: 'CASCADE' }) author!: User
    @ManyToOne(() => Post, (post) => post.comment, { onDelete: 'CASCADE' }) post!: Post 
}