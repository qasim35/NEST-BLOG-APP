import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform{
    transform(value: string, metadata: ArgumentMetadata) //considering the input value is a string
    {
        const val = parseInt(value, 10);
        if(isNaN(val)){
       throw new BadRequestException(`Validation failed. "${val}" is not an integer`)
        }
        return value
    }
}