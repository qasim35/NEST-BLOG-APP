import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appconfig from 'config/appconfig';
import { CommonModule } from './common/common.module';
import { UserModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.Strategy';
import { Blog } from './blogs/entities/blogs.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      //configration loaded after every module
      useFactory:()=>({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities:[Blog],
        autoLoadEntities: true,
        synchronize: true   //must be false in production environment

      })
     
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT :Joi.number().default(5432) //port must be a number
      }),
      load: [appconfig]
    }),
    BlogsModule, 
    CommonModule,
    UserModule,
    
    
],
  controllers: [AppController],//if not remove the blogcontroller it would be instanciated twice
  providers: [ AppService],
})
export class AppModule {}
