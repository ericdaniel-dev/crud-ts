import express, { Request, Response } from 'express';
import UserRoute from '../routes/UserRoute';

const web = (ports: number) => {
	const server = express();
	const port = ports;

	// Middleware to parse JSON request bodies
	server.use(express.json());

	server.get("/", (req: Request, res: Response) => {
		res.send('test server');
	})

	server.use('/user', UserRoute);

	server.listen(port, () => {
		console.log(`Server running on http://localhost:${port}`);
	})
};


export default web;