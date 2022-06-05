import mongoose from 'mongoose';
import Player from '../../models/player.mjs';
import server from '../../index.mjs';
import request from 'supertest';
server.close();

const id1 = new mongoose.Types.ObjectId();
const id2 = new mongoose.Types.ObjectId();
const recordId1 = new mongoose.Types.ObjectId();
const recordId2 = new mongoose.Types.ObjectId();


const player1 = new Player({
	_id: id1,
	name: 'Player1Name',
	records: [recordId1, recordId2],
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
	describe('Player model', () => {
		it('finds a player by name', async () => {
			Player.collection.insertMany([player1, player2]);

			const player = await Player.findOne({ name: 'Player2Name' });
			expect(player.name).toBe('Player2Name');
		});
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

		it('returns 404 if the provided ObjectId is not valid', async () => {
			Player.collection.insertMany([player1, player2]);

			const res = await request(server).get(`/api/players/${1111}`);

			expect(res.status).toBe(404);
			expect(res.body).toMatchObject({});
		});
	});

	describe('POST /', () => {
		it('saves a player if it is valid', async () => {
			const res = await request(server)
				.post('/api/players')
				.send({ name: 'player name' });

			const player = await Player.findOne({ name: 'player name' })
			expect(res.status).toBe(201);
			expect(player).toMatchObject({ name: 'player name' })
		});

		it('returns a player if it is saved', async () => {
			const res = await request(server)
				.post('/api/players')
				.send({ name: 'player name' })

				expect(res.status).toBe(201);
				expect(res.body).toMatchObject({ name: 'player name' })
				expect(res.body._id).not.toBeNull();
		});

		it('returns 400 if player missing a name', async () => {
			const res = await request(server)
				.post('/api/players')
				.send({ name: '' })

			expect(res.status).toBe(400);
		});
	});

	describe('PUT /', () => {
		it('updates a player\'s name', async () => {
			Player.collection.insertOne(player1);

			const res = await request(server)
				.put(`/api/players/${id1}`)
				.send({ name: 'updated name' })

			expect(res.body.name).toBe('updated name');
			expect(res.status).toBe(200);
		})

		it('adds a new record into the player entry', async () => {

			const recordId = new mongoose.Types.ObjectId();
			Player.collection.insertOne(player1);

			const res = await request(server)
				.put(`/api/players/${id1}`)
				.send({...player1, records: [...player1.records, recordId]})

			expect(res.body.records.length).toBe(3);
			expect(res.body.records).toContain(recordId.toHexString());
			expect(res.body.records).not.toContain(undefined);
		});
	});
});
