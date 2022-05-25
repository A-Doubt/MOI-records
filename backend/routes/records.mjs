import express from 'express';
import Record from '../models/records.mjs';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const records = await Record.find().sort('timeInTicks');
		res.send(records);
	} catch (err) {
		console.error(err.message);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const record = await Record.findById(req.params.id);
		if (!record)
			return res
				.status(404)
				.send(`Record of id: ${req.params.id} was not found.`);
		res.send(record);
	} catch (err) {
		console.error(err.message);
	}
});

router.post('/', async (req, res) => {
	try {
		console.log(req.body);
		const record = new Record({
			timeInTicks: req.body.timeInTicks,
			boss: {
				bossName: req.body.boss.bossName,
				hardmode: req.body.boss.hardmode,
				rotation: req.body.boss.rotation,
			},
			players: req.body.players,
		});
		await record.save();
		res.send(record);
	} catch (err) {
		res.status(500).send('something went wrong');
		console.error(err.message);
	}
});

export default router;
