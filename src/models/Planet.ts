import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Planet {
    @Field()
    id: number;
    
	@Field()
	name: string;

    @Field()
    mass: number;

    @Field()
    hasStation: boolean;
}
