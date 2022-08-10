import { forwardRef, Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversResolver } from './drivers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  imports: [
	  TypeOrmModule.forFeature([Driver]),
	  forwardRef(() => VehiclesModule)
	],
  providers: [DriversResolver, DriversService],
  exports: [DriversService]
})
export class DriversModule {}
