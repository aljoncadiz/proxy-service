import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesResolver } from './vehicles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { DriversModule } from 'src/drivers/drivers.module';

@Module({
	imports: [TypeOrmModule.forFeature([Vehicle]), DriversModule],
	providers: [VehiclesService, VehiclesResolver],
	exports: [VehiclesService]
})

export class VehiclesModule {}
