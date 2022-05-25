import mongoose from 'mongoose';
import Record from './records.mjs';

const playerSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String,
		minlength: 1,
		maxlength: 20,
	},
	records: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Record' }],
});

const Player = mongoose.model('Player', playerSchema);

export default Player;