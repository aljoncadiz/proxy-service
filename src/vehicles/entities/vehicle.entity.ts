import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Driver } from "src/drivers/entities/driver.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Vehicle {

	@PrimaryGeneratedColumn()
	@Field(type => Int)
	id: number;

	@Column()
	@Field()
	vin: string;

	@Column()
	@Field()
	make: string;

	@Column()
	@Field()
	year: string;

	@Column()
	@Field()
	model: string;

	@Column({nullable: true})
	@Field({nullable: true})
	description?: string;

	@Column()
	@Field(type => Int)
	driverId: number;

	@ManyToOne(() => Driver, driver => driver.vehicles)
	@Field(type => Driver)
	driver: Driver
}
