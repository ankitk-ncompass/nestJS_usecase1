import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity()
export class UsersPassword{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    password: string

    @Column({default: 1})
    isActive: number
}