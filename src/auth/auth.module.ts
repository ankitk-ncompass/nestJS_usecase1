import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { Users } from 'src/users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTable } from './auth.entity';
import { UsersPassword } from 'src/users/users-password.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), TypeOrmModule.forFeature([AuthTable]), TypeOrmModule.forFeature([UsersPassword])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
