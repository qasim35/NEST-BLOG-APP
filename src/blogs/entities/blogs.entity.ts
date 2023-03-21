
import { Entity,Column,PrimaryGeneratedColumn, JoinTable, ManyToMany } from "typeorm";
import { Comment } from "./comment.entity";
@Entity() //table name in the ''
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    subject: string;
    @Column()
    blogDetail: string;

    @Column({default: 0})
    recomendations: number
    
    @JoinTable()
    @ManyToMany(type => Comment,
        comment => comment.blogs,
        {
            cascade: true //any comments with any blogs added to db
        }
        )
    comment: Comment[];
}