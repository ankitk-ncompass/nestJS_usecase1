import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository,QueryFailedError } from 'typeorm';
import * as md5 from 'md5';
import { ApiResponse } from 'src/utils/apiResponse';
import { UsersPassword } from './users-password.entity';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,

        @InjectRepository(UsersPassword)
        private usersPasswordRepository: Repository<UsersPassword>
    ){}

    async create(user:{id:number, name: string, email:string, address:string, occupation:string, phone:number, password:string}){
        try {
            const value1 = {id:user.id, name:user.name, email: user.email, address: user.address, occupation:user.occupation, phone:user.phone}
            const result1 = await this.usersRepository.save(value1);
    
            const hashedPassword = md5(user.password);
            user.password = hashedPassword;
            const value2 = {id:user.id, password:user.password, isActive:1}
            const result2 = await this.usersPasswordRepository.save(value2)
    
            const isActive = result2.isActive;
            return {...result1,isActive};
        } catch (error) {
            if (error instanceof QueryFailedError && error.message.includes('Duplicate entry')) {
                // Handle duplicate entry error
                throw new Error('Duplicate entry. Username must be unique.');
              }
              // Handle other errors or rethrow the original error
              throw error;
        }

    }

    delete(id:number){
        return this.usersRepository.delete(id)
    }
}
