import axios from 'axios';
import { context } from '../src/context';

async function main() {
	const planets = await axios
		.get(
			'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+ps+where+pl_bmassj%3E10&format=json'
		)
		.then((res) =>
			res.data.map((planet: { pl_name: string; pl_bmassj: number }) => ({
				name: planet.pl_name,
				mass: planet.pl_bmassj,
				hasStation: false,
			}))
		);

	await context.prisma.planet.createMany({
		data: planets,
	});
}

main()
	.catch((e) => {
		console.log(e);
		process.exit(1);
	})
	.finally(async () => {
		await context.prisma.$disconnect();
	});
