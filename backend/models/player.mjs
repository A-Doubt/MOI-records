import Joi from 'joi';
import mongoose from 'mongoose';
import Record from './record.mjs';
import uniqueValidator from 'mongoose-unique-validator';

const playerSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String,
		minlength: 1,
		maxlength: 20,
		unique: true,
		uniqueCaseInsensitive: true,
	},
	records: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Record' }],
});
playerSchema.plugin(uniqueValidator);

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
