import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';

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
  
  await app.listen(3000);
}
bootstrap();
