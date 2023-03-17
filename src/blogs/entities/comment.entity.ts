import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./blogs.entity";
@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    comment: string

    @ManyToMany(type => Blog,
        blogs => blogs.comment
 )
 blogs: Blog[]

}