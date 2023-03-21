import { Module } from "@nestjs/common";
import { BlogsModule } from "src/blogs/blogs.module";
import { BlogsRatingService } from "./blogs-rating.service";

@Module({
    imports:[BlogsModule],
    providers: [BlogsRatingService],
})
export class BlogsRatingModule{}