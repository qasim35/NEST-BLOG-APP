import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //specify the properties you want to process and filter unwanted feilds
    forbidNonWhitelisted: true, //stops the execution and throws error if any unwanted feilds are present
    transform: true //convert all the input to class instance
  })) //global validation to validate roles/input etc
  await app.listen(3000);
}
bootstrap();
