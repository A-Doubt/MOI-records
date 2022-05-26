import mongoose from 'mongoose';
import Player from '../../models/player.mjs';
import server from '../../index.mjs';
import request from 'supertest';
server.close();

const id1 = new mongoose.Types.ObjectId();
const id2 = new mongoose.Types.ObjectId();

const player1 = new Player({
	_id: id1,
	name: 'Player1Name',
	records: [],
});
const player2 = new Player({
	_id: id2,
	name: 'Player2Name',
	records: [],
});

describe('/api/players', () => {
	beforeEach(() => {
		server.listen();
	});
	afterEach(async () => {
		await Player.deleteMany({});
		server.close();
	});
	describe('GET /', () => {
		it('gets all players', async () => {
			Player.collection.insertMany([player1, player2]);

			const res = await request(server).get('/api/players');

			expect(res.status).toBe(200);
			expect(
				res.body.some((player) => player.name === 'Player1Name')
			).toBeTruthy();
			expect(
				res.body.some((player) => player.name === 'Player2Name')
			).toBeTruthy();
		});
	});

	describe('GET /:id', () => {
		it('gets a player', async () => {
			Player.collection.insertMany([player1, player2]);

			const res = await request(server).get(`/api/players/${id1}`);

			expect(res.status).toBe(200);
			expect(res.body).toMatchObject({ name: 'Player1Name' });
		});

		it("returns 404 if a player of a given Id wasn't found", async () => {
			Player.collection.insertMany([player1, player2]);

			const res = await request(server).get(
				`/api/players/${new mongoose.Types.ObjectId()}`
			);

			expect(res.status).toBe(404);
			expect(res.body).toMatchObject({});
		});

		it("returns 404 if the provided ObjectId is not valid", async () => {
			Player.collection.insertMany([player1, player2]);

			const res = await request(server).get(
				`/api/players/${1111}`
			);

			expect(res.status).toBe(404);
			expect(res.body).toMatchObject({});
		});
	});
});
