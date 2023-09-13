import "reflect-metadata";
import { Entity, CreateDateColumn, UpdateDateColumn, Column, PrimaryColumn } from "typeorm";

@Entity({name: "usuario"})
export default class user {
    @PrimaryColumn({name: "id_user"})
    id: string;

    @Column({name: "email_user"})
    email: string;

    @Column({name: "nome_user"})
    name: string;

    @Column({name: "senha_user"})
    password: string;

    @Column({name: "tel_user"})
    telUser: number;

    @Column({name: "tel_emg_user"})
    telEmgUser: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

}
// CSV
