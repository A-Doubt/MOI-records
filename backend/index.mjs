import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import records from './routes/records.mjs';
import players from './routes/players.mjs';
import bodyParser from 'body-parser';
import config from 'config';
import cors from 'cors';
import Fawn from 'fawn';
import error from './middleware/error.js';



const app = express();
const db = config.get('db');
mongoose
	.connect(db)
	.then(console.log(`Connected to ${db}...`))
	.catch((err) => console.error(err.message));

Fawn.init(db);
	
	app.use(cors());
	app.use(bodyParser.json());
	app.use('/api/records', records);
	app.use('/api/players', players);
	
	app.use(error);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App listening on port ${port}.`);
});

export default server;
