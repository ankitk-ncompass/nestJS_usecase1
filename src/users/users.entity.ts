import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { UsersPassword } from "./users-password.entity";


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

}