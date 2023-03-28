import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller()

export class AuthController{
    @UseGuards(LocalAuthGuard)

    @Post('login')

    async login(@Request() req){
        console.log("login route")
        return req.user
    }
}