import Fawn from 'fawn';
import config from 'config';
import mongoose from 'mongoose';

export default function connectToMongoDB() {
	const db = config.get('db');
	mongoose
		.connect(db, { useUnifiedTopology: true })
		.then(console.log(`Connecting to ${db}...`))
		.catch((err) => console.error(err.message));

	Fawn.init(db);
}
