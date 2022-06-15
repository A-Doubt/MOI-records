import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import players from '../routes/players.mjs';
import records from '../routes/records.mjs';
import error from '../middleware/error.mjs';

export default function routes(app) {
	app.use(cors());
	app.use(bodyParser.json());
	app.use('/api/players', players);
	app.use('/api/records', records);
	app.use(error);

	if (process.env.NODE_ENV === 'production') {
		// static folder
		app.use(express.static('../frontend/build'));

		const __dirname = path.resolve();

		app.get('*', (req, res) => {
			res.sendFile(
				path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')
			);
		});
	}
}
