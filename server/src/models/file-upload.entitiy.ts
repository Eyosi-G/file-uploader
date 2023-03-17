import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FileUpload extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    originalName: string;

    @Column()
    name: string;

    @Column()
    size: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    uploaderName: string;
}