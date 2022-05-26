import express from 'express';
import Player from '../models/player.mjs';
import validateObjectId from '../middleware/validateObjectId.mjs';
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

export default router;
