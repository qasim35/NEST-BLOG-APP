import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsService } from './blogs/blogs.service';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [BlogsModule],
  controllers: [AppController],//if not remove the blogcontroller it would be instanciated twice
  providers: [AppService, BlogsService],
})
export class AppModule {}
