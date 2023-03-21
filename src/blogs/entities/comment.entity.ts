import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./blogs.entity";
@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    comments: string

    @ManyToMany(type => Blog, //many to many relation 
        blogs => blogs.comment
 )
 blogs: Blog[]

}