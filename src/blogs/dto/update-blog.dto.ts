// export class UpdateBlogDto {
//     readonly name?: string;
//    readonly subject?: string;
//    readonly blogDetail?: string;
//    readonly tags?: string[]
// }
// //? to make the properties optional

//better way to do this using partial types
import { PartialType } from "@nestjs/mapped-types";
import { CreateBlogDto } from "./create-blog.dto";

export class UpdateBlogDto extends PartialType(CreateBlogDto){}
//it will inherite all the properties of create blogs dto