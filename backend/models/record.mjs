import mongoose from 'mongoose';
import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
const objectId = JoiObjectId(Joi);

const recordSchema = new mongoose.Schema({
	encounter: {
		bossName: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 255,
		},
		hardmode: {
			type: Boolean,
			default: false,
		},
		teamSize: {
			type: Number,
			required: true,
			min: 1,
			max: 10,
		},
	},
	dateAdded: {
		type: Date,
		required: true,
		default: new Date(),
		immutable: true,
	},
	dateKilled: {
		type: Date,
		required: true,
		default: new Date(),
	},
	timeInTicks: {
		type: Number,
		required: true,
		min: 0,
		max: 6000,
	},
	notes: {
		type: String,
		maxlength: 1000,
	},
	players: [
		new mongoose.Schema(
			{
				playerId: {
					type: mongoose.Types.ObjectId,
					required: true,
					ref: 'Player',
				},
				style: {
					type: String,
					enum: ['melee', 'ranged', 'magic'],
				},
			},
			{ _id: false }
		),
	],
});

const Record = mongoose.model('Record', recordSchema);

function validateRecord(record) {
	const schema = Joi.object({
		_id: objectId(),
		dateAdded: Joi.date(),
		dateKilled: Joi.date(),
		encounter: Joi.object().keys({
			bossName: Joi.string().min(3).max(255).required(),
			hardmode: Joi.boolean().required(),
			teamSize: Joi.number().min(1).max(10).required(),
		}),
		timeInTicks: Joi.number().min(0).max(6000).required(),
		notes: Joi.string().max(1000).optional(),
		players: Joi.array().items(
			Joi.object().keys({
				playerId: objectId().required(),
				style: Joi.string().valid('melee', 'ranged', 'magic'),
			})
		),
	});
	return schema.validate(record);
}

export default Record;
export { validateRecord };
