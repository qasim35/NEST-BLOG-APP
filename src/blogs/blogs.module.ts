// nest generate module // command to create modules using cli
import { Injectable, Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsService } from './blogs.service';
import { Blog } from './entities/blogs.entity';
import { Comment } from './entities/comment.entity';
import { Event } from 'src/events/entities/event.entity';
import { some_blogs } from './blogs.constants';
import { ConfigModule } from '@nestjs/config';
import blogsConfig from './config/blogs.config';


class configService{}
class developmentConfigService{}
class productionConfigService{}
//Example Provider
// @Injectable()
// export class BlogsFactory{
//     create(){
//         return ['waar blog','history blog','education blog']
//     }
// }

@Module({
    imports: [TypeOrmModule.forFeature([Blog, Comment, Event]),
    ConfigModule.forFeature(blogsConfig)],
    controllers: [BlogsController],
     providers: [BlogsService,
        //use value syntax
    {provide: some_blogs,useValue:['waar blog','history blog','education blog']},//insert mock data using use value syntax
    //use class syntax
     {provide: configService,
    useClass:process.env.NODE_ENV === 'development' ? developmentConfigService: productionConfigService
    },
    //use factory syntax (costom provider pattern)
    //  {
    //     provide: some_blogs,
    //     useFactory:(Blogs:BlogsFactory)=>
    //     Blogs.create(),
    //    inject:[BlogsFactory] 
    // },//insert mock data using use value syntax


    ],
     exports: [BlogsService]
    })
export class BlogsModule {}
