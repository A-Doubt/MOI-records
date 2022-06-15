import cors from 'cors';
import bodyParser from 'body-parser';

import players from '../routes/players.mjs';
import records from '../routes/records.mjs';
import error from '../middleware/error.mjs';

export default function routes(app) {
	app.use(cors());
	app.use(bodyParser.json());
	app.use('/api/players', players);
	app.use('/api/records', records);
	app.use(error);
}
