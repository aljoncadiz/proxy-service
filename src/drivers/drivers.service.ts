import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { Repository } from 'typeorm';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversService {
	constructor(
		@InjectRepository(Driver) private driverRepository: Repository<Driver>,
		@Inject(forwardRef(() => VehiclesService)) private readonly vehicleService: VehiclesService
	){}

  create(createDriverInput: CreateDriverInput) {
    const newDriver = this.driverRepository.create(createDriverInput);
	return this.driverRepository.save(newDriver);
  }

  findAll() {
    return this.driverRepository.find();
  }

  findOne(id: number) {
    return this.driverRepository.findOneOrFail({where: {id: id}});
  }

  update(id: number, updateDriverInput: UpdateDriverInput) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }

  async getVehiclesByDriverId(id: number): Promise<Vehicle[]> {
	  return this.vehicleService.getVehiclesByDriverId(id);
  }
}
