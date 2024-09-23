import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import { User } from './User';
import { Comment } from './Comment';
import { Like } from './Like';


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("longtext")
    text: string;

    @Column({ nullable: true }) 
    image: string;

    @Column( { default: 0})
    commentsCount: number;

    @Column( { default: 0})
    likesCount: number;

    @Column( { default: ""})
    latestLike: string;

    @CreateDateColumn() 
    createdAt: Date;

    @Column({ default: false}) 
    likedByAuthUser: boolean;

    @OneToOne(() => Comment, (comment) => comment.post, {onDelete: 'SET NULL'})
    @ManyToOne(() => User, (user) => user.post, {onDelete: 'CASCADE'}) author!: User
    @OneToMany(() => Comment, (comment) => comment.post) comment!: Comment[]
    @OneToMany(() => Like, (like) => like.post) likes!: Like[]

    @JoinColumn() latestComment:Comment
}