import { Role } from "src/roles/role.entity";
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	JoinTable,
} from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		length: 50,
		unique: true,
	})
	username: string;

	@Column("varchar", {
		length: 120,
	})
	password: string;

	@Column({
		unique: true,
	})
	email: string;

	@Column({ length: 70 })
	name: string;

	@CreateDateColumn({ nullable: true })
	created_at: Date;

	@UpdateDateColumn({ nullable: true })
	updated_at: Date;

	@Column({ type: "boolean", default: true })
	active: boolean;

	@ManyToMany(() => Role)
	@JoinTable()
	roles: Role[];
}
