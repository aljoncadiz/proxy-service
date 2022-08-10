import { Injectable } from '@nestjs/common';
import { ResolveField } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { DriversService } from 'src/drivers/drivers.service';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Repository } from 'typeorm';
import { CreateVehicleInput } from './dto/create-vehicle-input';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
	constructor(
			@InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
			private driverService : DriversService
		){}
	
	async findAll(): Promise<Vehicle[]> {
		return this.vehicleRepository.find();
	}

	async createVehicle(createVehicleRequest: CreateVehicleInput): Promise<Vehicle> {
		const newVehicle = this.vehicleRepository.create(createVehicleRequest);
		return this.vehicleRepository.save(newVehicle);
	}

	async findOne(id: number): Promise<Vehicle> {
		return this.vehicleRepository.findOneOrFail({where: {id: id}});
	}

	async getDriver(driverId: number): Promise<Driver> {
		return this.driverService.findOne(driverId);
	}

	async getVehiclesByDriverId(id: number): Promise<Vehicle[]> {
		return this.vehicleRepository.find({where: {driverId: id}});
	}
 }
