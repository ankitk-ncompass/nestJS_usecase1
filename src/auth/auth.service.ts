import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository} from 'typeorm';
import * as md5 from "md5";
import * as jwt from "jsonwebtoken";
import * as otpGenerator from "otp-generator";
import { AuthTable } from './auth.entity';
import { UsersPassword } from 'src/users/users-password.entity';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private usersRepositry: Repository<Users>,

        @InjectRepository(AuthTable)
        private authRepository: Repository<AuthTable>,

        @InjectRepository(UsersPassword)
        private usersPasswordRepository: Repository<UsersPassword>
    ){}

    async login(user:{id:number, password:string}){
        const hashedPassword = md5(user.password);

        const userId = await this.usersPasswordRepository.createQueryBuilder('users').select('users.isActive')
        .where('users.id = :id AND users.password = :password', {id: user.id, password: hashedPassword}).getOne()

        if(!userId)
            throw new NotFoundException("User Not Found")

        const token = jwt.sign(user.id, "kyahaalhaibhai");
        
        if(!token)
            throw new InternalServerErrorException('Error creating token');

        return token;
    }

    async forgetPassword(user:{email: string, name: string}){
        const userId = await this.usersRepositry.createQueryBuilder('users').select('users.id')
        .where('users.email = :email AND users.name = :name', {email: user.email, name: user.name}).getOne();

        if(userId){
            const otp = otpGenerator.generate(6, {lowerCaseAlphabets: false, specialChars: false });

            const emailPayload = user.email;
            const date = new Date();
            const userID = userId.id;
            const payload = {id:userID, email:emailPayload, otp:otp, createdAt:date}
            this.saveInTable(payload)

            return otp;
        }   
        else{
            throw new UnauthorizedException( "YOU ARE NOT REGISTERED");
        }
    }

    saveInTable(payload){
        const isInserted = this.authRepository.save(payload)
    }

    async resetPassword(user:{id:number, otp: string, newPassword: string}){
        const userId = await this.authRepository.createQueryBuilder('authTable').select(['authTable.id', 'authTable.createdAt'])
        .where('authTable.id = :id AND authTable.otp = :otp', {id: user.id, otp: user.otp}).getOne();
        
        const minutesDiff = (Date.now()/1000 - userId.createdAt.getTime()/1000)/60;

        const hashedPassword = md5(user.newPassword);
        if(userId && minutesDiff < 2){
            const isUpdated = await this.usersPasswordRepository.createQueryBuilder().update(UsersPassword)
            .set({password: hashedPassword}).where('id = :id', {id: userId.id})
            .execute()

            if(isUpdated)
                return isUpdated;
        }else{
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
