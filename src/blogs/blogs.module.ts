// nest generate module // command to create modules using cli
import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsService } from './blogs.service';
import { Blog } from './entities/blogs.entity';
import { Comment } from './entities/comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Blog, Comment])],
    controllers: [BlogsController],
     providers: [BlogsService],
    })
export class BlogsModule {}
