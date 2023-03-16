import { IsString } from "class-validator";
export class CreateBlogDto {
    @IsString()
    readonly name: string;
    @IsString()
   readonly subject: string;
   @IsString()
   readonly blogDetail: string;
   @IsString({each: true}) //expected value is an array of string
   readonly tags: string[]
}