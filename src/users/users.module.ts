import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersPassword } from './users-password.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, UsersPassword])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
