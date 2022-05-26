import Joi from 'joi';
import mongoose from 'mongoose';
import Record from './record.mjs';

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

function validatePlayer(player) {
	const schema = Joi.object({
		name: Joi.string().min(1).max(20).required(),
		records: Joi.array(),
	})
	return schema.validate(player);
}

export default Player;
export { validatePlayer };
