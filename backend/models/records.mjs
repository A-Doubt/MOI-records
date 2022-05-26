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
	rotation: {
		type: String,
		minlength: 1,
		maxlength: 255,
	},
	notes: {
		type: String,
		minlength: 3,
		maxlength: 1000,
	},
	players: [
		new mongoose.Schema({
			_id: {
				type: mongoose.Types.ObjectId,
				required: true,
			},
			style: {
				type: String,
				enum: ['melee', 'ranged', 'magic'],
			},
		}),
	],
});

const Record = mongoose.model('Record', recordSchema);

function validateRecord(record) {
	const schema = Joi.object({
		_id: objectId(),
		encounter: Joi.object().keys({
			bossName: Joi.string().min(3).max(255).required(),
			hardmode: Joi.boolean().required(),
			teamSize: Joi.number().min(1).max(10).required(),
		}),
		timeInTicks: Joi.number().min(0).max(6000).required(),
		rotation: Joi.string().min(1).max(255),
		notes: Joi.string().min(3).max(1000),
		players: Joi.array().items(
			Joi.object().keys({
				_id: objectId().required(),
				style: Joi.string().valid('melee', 'ranged', 'magic'),
			})
		),
	});
	return schema.validate(record);
}

const record = {
	_id: (new mongoose.Types.ObjectId()).toHexString(),
	timeInTicks: 666,
	encounter: {
		bossName: 'Vorago',
		hardmode: true,
		teamSize: 1,
	},
	dateAdded: new Date(),
	dateKilled: new Date(),
	players: [{ _id: (new mongoose.Types.ObjectId()).toHexString(), style: 'melee' }],
	rotation: 'Vitalis',
	notes: 'test note',
}

// const { error, value } = validateRecord(record)
// console.log('ERROR: ', error);
// console.log('VALUE: ', value);

export default Record;
export { validateRecord };
