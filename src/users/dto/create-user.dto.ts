import { IsString ,IsEmail} from "class-validator";
export class CreateUserDto {
    
    @IsString()
    @IsEmail()
   readonly email: string;
   @IsString()
   readonly password: string
  

}