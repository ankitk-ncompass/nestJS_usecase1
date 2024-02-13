import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { UsersPassword } from "./users-password.entity";
import { AuthTable } from "src/auth/auth.entity";


@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    address: string

    @Column()
    occupation: string

    @Column()
    phone: number

    @OneToOne(() => UsersPassword)
    @JoinColumn()
    usersPassword: UsersPassword
    
    @OneToOne(() => AuthTable)
    @JoinColumn()
    authTable: AuthTable
}