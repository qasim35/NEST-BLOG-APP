import { Module} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./local.Strategy";
import { UserModule } from "src/users/users.module";
console.log('auth module')
@Module({
    
    imports: [UserModule],
    providers:[AuthService,LocalStrategy],
    controllers: [AuthController],
})

export class AuthModule{}


