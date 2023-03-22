import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true, //specify the properties you want to process and filter unwanted feilds
    forbidNonWhitelisted: true, //stops the execution and throws error if any unwanted feilds are present
    transform: true, //convert all the input to class instance
    transformOptions:{
      enableImplicitConversion: true //No need of Type decorator to parse string after this pipe property
    }
  })
  ) //global validation to validate roles/input etc
  //app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new WrapResponseInterceptor(),new TimeoutInterceptor())
  //for app documentation
  const options = new DocumentBuilder()
  .setTitle('Blogs-App')
  .setDescription('This is a blog app')
  .setVersion('1.0.0')
  .build()

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document)
  
  await app.listen(3000);
}
bootstrap();
