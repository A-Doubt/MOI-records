import express from 'express';
import Player from '../models/player.mjs';
import validateObjectId from '../middleware/validateObjectId.mjs';
import { validatePlayer } from '../models/player.mjs';
const router = express();

router.get('/', async (req, res) => {
	try {
		const players = await Player.find().sort('name');
		res.send(players);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Something went wrong. (GET /api/players');
	}
});

router.get('/:id', validateObjectId, async (req, res) => {
	try {
		const player = await Player.findById(req.params.id);
		if (!player)
			return res
				.status(404)
				.send(`Player of id: ${req.params.id} was not found.`);
		res.send(player);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Something went wrong. (GET /api/players/:id');
	}
});

router.post('/', async (req, res) => {
	console.log(req.body);
	try {
		// Validate with Joi
		const { error } = validatePlayer(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		console.log('name', req.body.name);
		const player = new Player({ name: req.body.name });
		console.log(player);
		await player.save();
		res.status(201).send(player);
	} catch (err) {
		console.error(err.message);
		res.status(500).send(err.message);
	}
});

router.put('/:id', async (req, res) => {
	console.log(req.body)
	try {
		const player = await Player.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				records: req.body.records,
			},
			{ new: true }
		);
		console.log('player updated: ', player);
		res.send(player);
	} catch (err) {
		console.error(err.message);
		res.status(500).send(err.message);
	}
})

export default router;
