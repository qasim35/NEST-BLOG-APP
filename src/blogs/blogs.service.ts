//nest generate service //command to create service using nest cli
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blogs.entity';

@Injectable()
export class BlogsService {
   constructor(
    @InjectRepository(Blog) 
    private readonly blogRepository : Repository<Blog>
   ){}
    findAll(){
        return this.blogRepository.find()
    };
   async findOne(id: string){
        const blogs = await this.findOne(id)
        if(! blogs){
            throw new HttpException(`No blog with id: ${id}`,HttpStatus.NOT_FOUND)
        }
        return this.blogRepository.getId(blogs)
    };
    create(CreateBlogDto: CreateBlogDto){
        const blogs = this.blogRepository.create(CreateBlogDto);
        return this.blogRepository.save(blogs)
    }
    async update(id:string, updateBlogDto: UpdateBlogDto){
       const blogs = await this.blogRepository.preload({
        id: +id,
        ...updateBlogDto
       })
       if(! blogs){
        throw new NotFoundException(`blog with ${id} not found`)
       }
       return this.blogRepository.save(blogs)
    };
   async remove(id:string){
        const blogs = await this.findOne(id)
        return this.blogRepository.remove(blogs)
    }
}
