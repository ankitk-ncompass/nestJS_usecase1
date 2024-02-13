import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from 'src/utils/apiResponse';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @Post("/login")
    async login(@Body() user:{id:number, password: string}, @Res() res:Response){
        const token = await this.authService.login(user)
        const resp = new ApiResponse(200, {message: "Token Created", token:token})
        return resp.apiResponse(res)
    }

    @Post("/forget-password")
    async forgetPassword(@Body() user:{email:string, name:string}, @Res() res:Response){
        const otp = await this.authService.forgetPassword(user)
        const resp = new ApiResponse(200, {message:"OTP CREATED", otp:otp})
        return resp.apiResponse(res)
    }

    @Post("/reset-password")
    async resetPassword( @Body() user:{id:number, otp: string, newPassword: string}, @Res() res:Response){
        const result =await this.authService.resetPassword(user)
        const resp = new ApiResponse(200, {message:"Password Changed", result: result})
        return resp.apiResponse(res)
    }
}
