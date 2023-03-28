//nest generate service //command to create service using nest cli
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { some_blogs } from './blogs.constants';
import blogsConfig from './config/blogs.config';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blogs.entity';
import { Comment } from './entities/comment.entity';

@Injectable({scope:Scope.REQUEST})
export class BlogsService {
   constructor(
    @InjectRepository(Blog) 
    private readonly blogRepository : Repository<Blog>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly ConfigService: ConfigService,
    
    //injecting the mock data provider
    //using the inject decorator which expects a single value
    // @Inject(some_blogs) extraBlogs:string[]
    //injecting configration object directly //no need of get method
    @Inject(blogsConfig.KEY)
    private readonly blogsConfigiration: ConfigType<typeof blogsConfig>,
    
   ){
    
    console.log(blogsConfigiration.foo)
   }
    findAll(paginationQuery : PaginationQueryDto){
        const {limit, offset} = paginationQuery
        return this.blogRepository.find({
            relations : ['comment'],
            skip: offset,
            take: limit   //for pagination
        })
    };
   async findOne(id: string){
        const blogs = await this.blogRepository.findOne({where: {id: parseInt(id, 10)},
    relations: ['comment']
    })
        if(! blogs){
            throw new HttpException(`No blog with id: ${id}`,HttpStatus.NOT_FOUND)
        }
        return blogs
    };
   async create(CreateBlogDto: CreateBlogDto){
        const comment =  await Promise.all(
            CreateBlogDto?.comments?.map(comment => this.preloadComment(comment)), 
            //check all the comments in the array
            
        );
        //console.log(comment,'array')
        
        const blogs = this.blogRepository.create({
            ...CreateBlogDto,
            comment
        })
        return this.blogRepository.save(blogs)
    }
    async update(id:string, updateBlogDto: UpdateBlogDto){
        const comment = updateBlogDto.comments && (await Promise.all( updateBlogDto.comments.map(comment => this.preloadComment(comment))
        )); //check if there are any values in comment array or not
       const blogs = await this.blogRepository.preload({
        id: +id,
        ...updateBlogDto,
        comment
       })
       if(! blogs){
        throw new NotFoundException(`blog with ${id} not found`)
       }
       return this.blogRepository.save(blogs)
    };
   async remove(id:string){
        const blogs = await this.findOne(id)
        return this.blogRepository.remove(blogs)
    };
    public async preloadComment(comments: string) : Promise<Comment>{
        const existingComment = await this.commentRepository.findOne({where:{comments}})
    
        if(existingComment){
            return existingComment
        }
        return this.commentRepository.create({comments})
    }
}
 