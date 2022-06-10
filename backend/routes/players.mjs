import express from 'express';
import Player from '../models/player.mjs';
import validateObjectId from '../middleware/validateObjectId.mjs';
import { validatePlayer } from '../models/player.mjs';
const router = express();

router.get('/', async (req, res) => {
	const players = await Player.find().sort('name');
	res.send(players);
});

router.get('/:id', validateObjectId, async (req, res) => {
	const player = await Player.findById(req.params.id);
	if (!player)
		return res
			.status(404)
			.send(`Player of id: ${req.params.id} was not found.`);
	res.send(player);
});

router.post('/', async (req, res) => {
	// Validate with Joi
	const { error } = validatePlayer(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const player = new Player({ name: req.body.name });
	await player.save();
	res.status(201).send(player);
});

router.put('/:id', async (req, res) => {
	const player = await Player.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			records: req.body.records,
		},
		{ new: true }
	);
	res.send(player);
});

export default router;
