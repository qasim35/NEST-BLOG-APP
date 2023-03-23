import { Controller,Get,Param,Post,Body, HttpCode, HttpStatus, Res, Patch, Delete, Query, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService : UsersService
    ){}
    @Public() //make the route public
    @Get('all') //nasted route to get all blogs
    //get all blogs
    // findAll(@Res()response,@Query()paginationQuery)
    async findAll(@Protocol() protocol:string, //custom pipe 
    @Query() paginationQuery : PaginationQueryDto){
        console.log(protocol)
       return this.usersService.findAll(paginationQuery)
//         const {limit,offset} = paginationQuery //object destructuring
// response.status(200).send( `All blogs are here limit: ${limit} offset: ${offset}`)
    }
    //get blog by ID
    @Public()
    @Get(':id') //nasted route id to get blog with a specfic id
   findOne(@Param('id',ParseIntPipe)id:string){
   console.log(id);
    return this.usersService.findOne(id)
   }
    //create/post a blog
    @Post()
    //posting a blog using the Body decorator
    // @HttpCode(HttpStatus.GONE) //decorators for specfic http responses
    // create(@Body()body){ //specfing a particular parameter without feild name means the whole body
    //     return body

    // };
    //simple dto (data transfer object) to create blog //only if we dont have a real database
    create(@Body()CreateUserDto: CreateUserDto){
       return this.usersService.create(CreateUserDto) //dto to pass any type of payload
    }
    //update a blog
    @Patch(':id')
    // update(@Param('id')id:string,@Body()body,@Res()response){
    //  response.status(200).send(`Blog updated successfully with id ${id}`)

    // }
    //parameter based validation pipe only for update route body
    update(@Param('id')id:string,@Body(ValidationPipe)UpdateUserDto: UpdateUserDto){
        return this.usersService.update(id,UpdateUserDto)
    }
    //delete a blog
    @Delete(':id')
    // remove(@Param('id')id:string,@Res()response){
    //     response.status(200).send(`Blog deleted successfully with id ${id}`)

    // }
    remove(@Param('id')id:string){
        return this.usersService.remove(id)
    }
}
