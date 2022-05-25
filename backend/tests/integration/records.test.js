import request from 'supertest';
import server from '../../index.mjs';
server.close();

describe('/api/records', () => {
	beforeEach(async () => {
		await server.listen();
		console.log('server listening');
	});
	afterEach(async () => {
		console.log('server closing');
		await server.close();
	});
	describe('GET /', () => {
		it('returns all records', async () => {
			const res = await request(server).get('/api/records');
			expect(res.status).toBe(200);
		});
	});
});
