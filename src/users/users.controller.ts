import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse } from 'src/utils/apiResponse';
import { UsersPassword } from './users-password.entity';


@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ){}

    @Post("/create")
    async create(@Body() user: {id:number, name: string, email:string, address:string, occupation:string, phone:number, password:string}, @Res() res:Response){
        const result = await this.userService.create(user)
        const resp = new ApiResponse(200, {message:"User is created", result:result});
        resp.apiResponse(res);
    }

    @Post("/delete")
    remove(@Body() id:number){
        return this.userService.delete(id)
    }
}
