import { Ctx, Query, Resolver } from 'type-graphql';
import { Planet } from '../models/Planet';
import { Context } from '../context';

@Resolver()
export class PlanetsResolver {
	@Query(() => [Planet])
	async suitablePlanets(@Ctx() ctx: Context) {
		const planets = await ctx.prisma.planet.findMany({})

		return planets
	}
}
