import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../context';

@Resolver()
export class AuthResolver {
	@Mutation(returns => String)
	async login(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() ctx: Context
	) {
		const user = await ctx.prisma.user.findUnique({ where: { email } });
		if (!user) throw new Error('User does not exists!');

		const isAuthorized = bcrypt.compareSync(password, user.password);

		if (!isAuthorized) throw new Error('User/password incorrect!');

		const data = { userId: user.id, email: user.email };
		const secretKey = process.env.JWT_SECRET as string;
		const config = { expiresIn: 60 * 60 };

		const token = jwt.sign(data, secretKey, config);
		return token;
	}
}
