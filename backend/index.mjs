import express from 'express';
import mongoose from 'mongoose';
import records from './routes/records.mjs';
import players from './routes/players.mjs';
import bodyParser from 'body-parser';

const app = express();
const url = 'mongodb://127.0.0.1:27017/moi';
mongoose
	.connect(url)
	.then(console.log('Connected to MongoDB.'))
	.catch((err) => console.error(err.message));

app.use(bodyParser.json());
app.use('/api/records', records);
app.use('/api/players', players);

app.get('/', (req, res) => {
	res.send('Hello there, General Kenobi!');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App listening on port ${port}.`);
});

export default server;
