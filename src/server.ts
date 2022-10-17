import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { context } from './context';
import { PlanetsResolver } from './resolvers/planets-resolver';

async function app() {
	const schema = await buildSchema({
		resolvers: [PlanetsResolver],
	});

	const server = new ApolloServer({
		schema,
		context,
	});

	const { url } = await server.listen();

	console.log(`Server is running on ${url} 🚀`);
}

app();
