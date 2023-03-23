import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository <User>
    ){}
    findAll(paginationQuery : PaginationQueryDto){
        const {limit, offset} = paginationQuery
        return this.userRepository.find({
            skip: offset,
            take: limit   //for pagination
        })
    };
    async findOne(id: string){
        const blogs = await this.userRepository.findOne({where: {id: parseInt(id, 10)},
    })
        if(! blogs){
            throw new HttpException(`No user with id: ${id}`,HttpStatus.NOT_FOUND)
        }
        return blogs
    };
    async create(CreateUserDto: CreateUserDto){
        const users = this.userRepository.create(CreateUserDto)
        return this.userRepository.save(users)
    };
    async update(id:string, updateUserDto: UpdateUserDto){

       const blogs = await this.userRepository.preload({id: +id,
    ...updateUserDto
    })
       if(! blogs){
        throw new NotFoundException(`user with ${id} not found`)
       }
       return this.userRepository.save(blogs)
    };
    async remove(id:string){
        const blogs = await this.findOne(id)
        return this.userRepository.remove(blogs)
    };
}
