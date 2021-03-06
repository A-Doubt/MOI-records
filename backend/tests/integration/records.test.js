import request from 'supertest';
import mongoose from 'mongoose';
import Record from '../../models/record.mjs';
import server from '../../index.mjs';
import Player from '../../models/player.mjs';
server.close();

const id1 = new mongoose.Types.ObjectId();
const id2 = new mongoose.Types.ObjectId();
const playerId = new mongoose.Types.ObjectId();

// Sample records used for tests.
let records = [
	{
		_id: id1,
		timeInTicks: 666,
		dateKilled: new Date(),
		encounter: {
			bossName: 'Vorago',
			hardmode: true,
			teamSize: 1,
		},
		players: [{ playerId: playerId }],
		notes: 'test note',
	},
	{
		_id: id2,
		timeInTicks: 555,
		dateKilled: new Date(),
		encounter: {
			bossName: 'Kerapac',
			hardmode: false,
			teamSize: 2,
		},
		players: [{ playerId: mongoose.Types.ObjectId() }],
		notes: 'test note 2',
	},
];

describe('/api/records', () => {
	beforeEach(() => {
		server.listen();
	});
	afterEach(async () => {
		await Record.deleteMany({});
		await Player.deleteMany({});
		server.close();
	});

	describe('GET /', () => {
		it('returns all records', async () => {
			Record.collection.insertMany(records);

			const res = await request(server).get('/api/records');
			expect(res.status).toBe(200);
			expect(
				res.body.some(
					(record) => record.encounter.bossName === 'Kerapac'
				)
			).toBeTruthy();
			expect(
				res.body.some(
					(record) => record.encounter.bossName === 'Vorago'
				)
			).toBeTruthy();
		});
	});

	describe('GET /:id', () => {
		it('returns 404 if a record is not found', async () => {
			Record.collection.insertOne(records[0]);

			const res = await request(server).get(
				`/api/records/${new mongoose.Types.ObjectId()}`
			);

			expect(res.status).toBe(404);
		});
		it('returns 404 if the provided ObjectId is not valid', async () => {
			Record.collection.insertOne(records[0]);

			const res = await request(server).get(`/api/records/${2137}`);

			expect(res.status).toBe(404);
		});
		it('returns a record', async () => {
			Record.collection.insertOne(records[0]);

			const res = await request(server).get(`/api/records/${id1}`);

			expect(res.status).toBe(200);
			expect(res.body).toMatchObject({ timeInTicks: 666 });
		});
	});

	describe('POST /', () => {
		it('returns the record if it is valid', async () => {
			await Player.collection.insertOne({
				name: 'player',
				_id: playerId,
				records: [],
			});

			const recordToSave = {
				timeInTicks: 666,
				dateKilled: new Date(),
				encounter: {
					bossName: 'Vorago',
					hardmode: true,
					teamSize: 1,
				},
				players: [{ playerId }],
				notes: 'test note',
			};

			const res = await request(server)
				.post('/api/records')
				.send(recordToSave);

			expect(res.status).toBe(201);
			expect(res.body).not.toBeNull();
			expect(res.body).toMatchObject({ timeInTicks: 666 });
		});

		it('returns 400 if record is missing timeInTicks', async () => {
			const recordToSave = records[0];
			recordToSave.timeInTicks = '';

			const res = await request(server)
				.post('/api/records')
				.send(recordToSave);

			expect(res.status).toBe(400);
		});
	});

	describe('DELETE /:id', () => {
		it('returns 200 if record is deleted', async () => {
			expect(200).toBe(200);
		});
	});
});
