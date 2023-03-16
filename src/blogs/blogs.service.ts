//nest generate service //command to create service using nest cli
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Blog } from './entities/blogs.entity';

@Injectable()
export class BlogsService {
    private blogs: Blog[] =[
        {
            id: 1,
            name:'History Blog',
            subject: 'this blog is about history',
            blogDetail: 'this blog provides a brief history of the generations existed in the passed times',
            tags: ['history','waar','tour']
        }
    ];
    findAll(){
        return this.blogs
    };
    findOne(id:string){
        const blogs =  this.blogs.find(item => item.id === +id)
        if(! blogs){
            throw new HttpException(`No blog with id: ${id}`,HttpStatus.NOT_FOUND)
        }
    };
    create(CreateBlogDto: any){
        this.blogs.push(CreateBlogDto);
        return CreateBlogDto
    }
    update(id:string, createBlogData:any){
        const existingBlog = this.findOne(id)
        // if(existingBlog){
        //     //update the blog
        // }
    };
    remove(id:string){
        const blogIndex = this.blogs.findIndex(item => item.id === +id);
        if(blogIndex >= 0){
            this.blogs.splice(blogIndex, 1)
        }
    }
}
