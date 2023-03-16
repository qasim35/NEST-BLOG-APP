//nest generate controller //command to create controller using nest cli
import { Controller,Get,Param,Post,Body, HttpCode, HttpStatus, Res, Patch, Delete, Query } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
@Controller('blogs')
export class BlogsController {
    //Constructor to inject blogs servce using provider
    constructor(private readonly blogsService: BlogsService){}
    //GET http handler to get all the blogs
    //GET decorator to get blogs
    @Get('all') //nasted route to get all blogs
    //get all blogs
    // findAll(@Res()response,@Query()paginationQuery)
    findAll(){
       return this.blogsService.findAll()
//         const {limit,offset} = paginationQuery //object destructuring
// response.status(200).send( `All blogs are here limit: ${limit} offset: ${offset}`)
    }
    //get blog by ID
    @Get(':id') //nasted route id to get blog with a specfic id
    //geting a specfic blog through id using the param decorator
    // findOne(@Param('id')id:string){
    //     return `get blog by specfic id  ${id}`
   // }
   findOne(@Param('id')id:string){
    return this.blogsService.findOne(id)
   }
    //create/post a blog
    @Post()
    //posting a blog using the Body decorator
    // @HttpCode(HttpStatus.GONE) //decorators for specfic http responses
    // create(@Body()body){ //specfing a particular parameter without feild name means the whole body
    //     return body

    // };
    //simple dto (data transfer object) to create blog //only if we dont have a real database
    create(@Body()CreateBlogDto: CreateBlogDto){
       return this.blogsService.create(CreateBlogDto) //dto to pass any type of payload
    }
    //update a blog
    @Patch(':id')
    // update(@Param('id')id:string,@Body()body,@Res()response){
    //  response.status(200).send(`Blog updated successfully with id ${id}`)

    // }
    update(@Param('id')id:string,@Body()UpdateBlogDto: UpdateBlogDto){
        return this.blogsService.update(id,UpdateBlogDto)
    }
    //delete a blog
    @Delete(':id')
    // remove(@Param('id')id:string,@Res()response){
    //     response.status(200).send(`Blog deleted successfully with id ${id}`)

    // }
    remove(@Param('id')id:string){
        return this.blogsService.remove(id)
    }
}

