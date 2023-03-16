import { Entity,Column,PrimaryGeneratedColumn } from "typeorm";
@Entity('BLOGS') //table name in the ''
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    subject: string;
    @Column()
    blogDetail: string;
    @Column('json',{nullable: true})
    tags: string[]
}