import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne} from "typeorm";
import { User } from './User';
import { Post} from './Post';

@Entity('likes')
export class Like {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn() 
    createdAt: Date   

    @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' }) author!: User
    @ManyToOne(() => Post, (post) => post.likes, { onDelete: 'CASCADE' }) post!: Post  
}