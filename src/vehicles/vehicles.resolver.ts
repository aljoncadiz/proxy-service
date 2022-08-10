import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { Driver } from 'src/drivers/entities/driver.entity';
import { CreateVehicleInput } from './dto/create-vehicle-input';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';

@Resolver(of => Vehicle)
export class VehiclesResolver {
	constructor(private vehicleService: VehiclesService) {}

	@Query(returns => [Vehicle]) //decorator Query should be from @nestjs/graphql
	vehicles(): Promise<Vehicle[]> {
		return this.vehicleService.findAll();
	}

	@Mutation(returns => Vehicle)
	createVehicle(@Args('createVehicleInput') createVehicleInput: CreateVehicleInput): Promise<Vehicle> {
		return this.vehicleService.createVehicle(createVehicleInput);
	}

	@Query(returns => Vehicle)
	getVehicleById(@Args('id', {type: () => Int}) id: number): Promise<Vehicle> {
		return this.vehicleService.findOne(id);
	}

	@ResolveField(returns => Driver)
	driver(@Parent() vehicle: Vehicle): Promise<Driver> {
		return this.vehicleService.getDriver(vehicle.driverId);
	}
}
