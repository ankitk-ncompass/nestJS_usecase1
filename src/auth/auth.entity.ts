import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthTable{
    @PrimaryColumn()
    id: number

    @Column()
    email: string

    @Column()
    otp: string

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date
}