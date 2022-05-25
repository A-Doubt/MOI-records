import express from 'express';
const router = express();

router.get('/', (req, res) => {
	res.send('PLAYERS module');
});

export default router;
