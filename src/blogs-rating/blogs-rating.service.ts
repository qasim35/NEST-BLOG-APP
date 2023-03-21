import { Injectable } from "@nestjs/common";
import { BlogsService } from "src/blogs/blogs.service";
@Injectable()
export class BlogsRatingService {
    constructor(private readonly blogsService :BlogsService ){}
}