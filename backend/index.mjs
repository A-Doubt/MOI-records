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
import winston from 'winston';
import logging from './logging.mjs';

logging(); // enable winston logger

if (!config.get('adminPassword')) {
	console.error('FATAL ERROR: adminPassword is not defined');
	process.exit(1);
}

const app = express();

const db = config.get('db');
mongoose
	.connect(db)
	.then(console.log(`Connected to ${db}...`))
	.catch((err) => console.error(err.message));

Fawn.init(db);

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/records', records);
app.use('/api/players', players);

// Error handle
app.use(error);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App listening on port ${port}.`);
});

export default server;
