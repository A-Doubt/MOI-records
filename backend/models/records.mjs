import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
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
		min: 0,
		max: 6000,
		required: true,
	},
	boss: {
		bossName: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 255,
		},
		hardmode: {
			type: Boolean,
		},
		rotation: {
			type: String,
			minlength: 3,
			maxlength: 255,
		},
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

export default Record;
