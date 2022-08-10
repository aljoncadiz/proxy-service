import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDriverInput {
	@Field()
	name: string
}
