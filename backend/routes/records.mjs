import express from 'express';
import Record from '../models/record.mjs';
import Player from '../models/player.mjs';
import mongoose from 'mongoose';
import validateObjectId from '../middleware/validateObjectId.mjs';
import { validateRecord } from '../models/record.mjs';
import Fawn from 'fawn';

const router = express.Router();

router.get('/', async (req, res) => {
	const records = await Record.find({});
	res.send(records);
})

router.get('/boss', async (req, res) => {
	const query = {
		encounter: {
			bossName: req.query['boss-name'],
			hardmode: req.query.hardmode === 'true' ? true : false,
			teamSize: parseInt(req.query['team-size']),
		},
	};
	try {
		const records = await Record.find(query)
			.sort('timeInTicks')
			.populate('players.playerId');
		res.send(records);
	} catch (err) {
		res.status(500).send('something went wrong.');
		console.error(err.message);
	}
});

router.get('/sort', async (req, res) => {
	try {
		const records = await Record.find({})
			.sort({ dateAdded: -1 })
			.populate('players.playerId')
			.limit(20);
		res.send(records);
	} catch (err) {
		console.error(err.message);
	}
});

router.get('/count', async (req, res) => {
	try {
		const numberOfRecords = await Record.find({}).count();
		res.send(numberOfRecords.toString());
	} catch (err) {
		console.error(err.message);
	}
});


router.get('/:id', validateObjectId, async (req, res) => {
	try {
		const record = await Record.findById(req.params.id);
		if (!record)
			return res
				.status(404)
				.send(`Record of id: ${req.params.id} was not found.`);
		res.send(record);
	} catch (err) {
		res.status(500).send('something went wrong.');
		console.error(err.message);
	}
});

router.post('/', async (req, res) => {
	try {
		// Validate with Joi
		const { error } = validateRecord(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const record = new Record({
			_id: req.body._id,
			timeInTicks: req.body.timeInTicks,
			encounter: {
				bossName: req.body.encounter.bossName,
				hardmode: req.body.encounter.hardmode,
				teamSize: req.body.encounter.teamSize,
			},
			players: req.body.players,
			dateKilled: req.body.dateKilled,
			dateAdded: new Date(),
			notes: req.body.notes ? req.body.notes : '',
		});

		let task = Fawn.Task();
		task.save('records', record);

		for (let i = 0; i < record.players.length; i++) {

			task = task.update(
				'players',
				{
					_id: record.players[i].playerId,
				},
				{
					$push: { records: record._id },
				}
			);
		}
		task.run();

		res.status(201).send(record);
	} catch (err) {
		res.status(500).send('something went wrong.');
		console.error(err.message);
	}
});

router.delete('/:id', validateObjectId, async (req, res) => {
	try {
		const task = Fawn.Task();

		const record = await Record.findById(req.params.id);
		record.players.forEach((player) => {
			// remove the record from records in players documents
			task.update('players', { _id: player.playerId }, {
				'$pull' : {
					records: record._id
				}
			})
		});
		task.remove('records', {
			_id: new mongoose.Types.ObjectId(req.params.id),
		});

		await task.run();
		res.status(200).send(record);

	} catch (err) {
		res.status(500).send('something went wrong.');
		console.error(err.message);
	}
});

export default router;
