import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { User } from "src/users/entities/users.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(private userService:UsersService){}
  async validateUserCred(email:string,password:string):Promise<any>{
    const user = this.userService.getUserByEmail(email)
    // if(! user){
    //     throw new BadRequestException()
    // }
    // if(!bcrypt.compare(password,(await user).password)){
    //     throw new UnauthorizedException()
    // }
    return user

}
}