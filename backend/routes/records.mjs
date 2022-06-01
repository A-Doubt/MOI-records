import express from 'express';
import Record from '../models/record.mjs';
import mongoose from 'mongoose';
import validateObjectId from '../middleware/validateObjectId.mjs';
import { validateRecord } from '../models/record.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
	const query = {
		bossName: req.query['boss-name'],
		teamSize: req.query['team-size'],
		hardmode: req.query.hardmode,
	}
	console.log(query);
	try {
		const records = await Record.find().sort('timeInTicks');
		res.send(records);
	} catch (err) {
		res.status(500).send('something went wrong');
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
		res.status(500).send('something went wrong');
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
			rotation: req.body.rotation,
			notes: req.body.notes,
		});
		await record.save();
		res.status(201).send(record);
	} catch (err) {
		res.status(500).send('something went wrong');
		console.error(err.message);
	}
});

export default router;
