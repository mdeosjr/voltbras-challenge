import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Planet {
    @Field(type => ID)
    id: number;
    
	@Field()
	name: string;

    @Field()
    mass: number;

    @Field()
    hasStation: boolean;
}
