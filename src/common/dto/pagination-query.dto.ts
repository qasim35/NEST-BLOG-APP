import { IsOptional, IsPositive, isPositive } from "class-validator";
export class PaginationQueryDto{
    @IsOptional() //this is a optional property can be empty or null
    @IsPositive() //must have to be a positive number
    limit : number

    @IsOptional() //this is a optional property can be empty or null
    @IsPositive() //must have to be a positive number
    offset : number
}
