import { MiddlewareConsumer, Module,  NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ApiKeyGuard } from "./guards/api-key/api-key.guard";
import { LoggingMiddleware } from "./middleware/logging.middleware";

@Module({imports:[ConfigModule],
     providers: [{provide: APP_GUARD, useClass: ApiKeyGuard}]})

export class CommonModule implements NestModule{
     configure(consumer: MiddlewareConsumer) {
         consumer.apply(LoggingMiddleware).forRoutes('*') //allow all routes
          consumer.apply(LoggingMiddleware).forRoutes({path:'blogs/all', method: RequestMethod.GET}) //restrict to particular route and method
         consumer.apply(LoggingMiddleware).exclude('login').forRoutes('*') //exclude certain routes
     }
}