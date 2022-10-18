import bcrypt from 'bcrypt';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../context';
import { User } from '../models/User';

@Resolver()
export class UsersResolver {
	@Mutation(returns => User)
	async create(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() ctx: Context
	) {
		const user = await ctx.prisma.user.findUnique({ where: { email } });
		if (user) throw new Error('User already registered!');

		const hashedPassword = bcrypt.hashSync(password, 10);
		const createdUser = await ctx.prisma.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});

		return createdUser
	}
}
