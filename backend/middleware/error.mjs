export default function error(err, req, res, next) {
	// log the error
	res.status(500).send('Internal server error.')
}