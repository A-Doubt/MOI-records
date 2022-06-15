export default function auth(req, res, next) {
	const adminPassword = req.get('adminPassword');
	if (process.env.adminPassword !== adminPassword) {
		return res.status(403).send('The password you provided is invalid.');
	}
	next();
}
