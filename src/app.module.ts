import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
	GraphQLModule.forRoot<ApolloDriverConfig>({
		driver: ApolloDriver,
		autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
	}),
	TypeOrmModule.forRoot({
		type: 'sqlite',
		database: ':memory:',
		entities: ['dist/**/*.entity{.ts,.js}'],
		synchronize: true,
	}),
    VehiclesModule,
    DriversModule,
  ],
})
export class AppModule {}
