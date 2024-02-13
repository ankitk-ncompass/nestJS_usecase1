import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';
import { AuthTable } from './auth/auth.entity';
import { UsersPassword } from './users/users-password.entity';

@Module({
  imports: [UsersModule, AuthModule,
  TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ankitkarn3954#',
      database: 'nestjs',
      entities: [Users, AuthTable, UsersPassword],
      synchronize: true
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
