import 'reflect-metadata';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { context } from './context';
import { PlanetsResolver } from './resolvers/planets-resolver';
import { UsersResolver } from './resolvers/users-resolver';
import { AuthResolver } from './resolvers/auth-resolver';

dotenv.config();

async function app() {
	const schema = await buildSchema({
		resolvers: [PlanetsResolver, UsersResolver, AuthResolver],
	});

	const server = new ApolloServer({
		schema,
		context,
	});

	const { url } = await server.listen();

	console.log(`Server is running on ${url} 🚀`);
}

app();
