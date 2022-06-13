import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import logging from './startup/logging.mjs';
import connectToMongoDB from './startup/db.mjs'
import routes from './startup/routes.mjs';

const app = express();

logging(); // enable winston logger
connectToMongoDB(); // connect to DB
routes(app); // routes + cors/body parser

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App listening on port ${port}.`);
});

export default server;
