import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    BlogsModule, 
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username:'postgres',
    password: 'qasim35',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true
  }),
],
  controllers: [AppController],//if not remove the blogcontroller it would be instanciated twice
  providers: [ AppService],
})
export class AppModule {}
