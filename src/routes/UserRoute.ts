import express, { Request, Response } from 'express';
import userModel from '../model/UserModel';


const UserRoute = express.Router();

UserRoute.get('/', async (req: Request, res: Response) => {
	const users = await userModel.getAllUsers();
	res.status(200).json({
		data: users.data
	});
});
UserRoute.post('/register', async (req: Request, res: Response) => {
	const { username, password, email } = req.body;
	if(!username || !password){
		return res.status(400).json({error: 'Username and password are required!'});
	}
	const data = await userModel.createUser(username, password, email);
	if(data.status==='failed'){
		return res.status(400).json(data);
	}
	return res.status(200).json(data);
});
UserRoute.post('/login', async (req: Request, res: Response) => {
	const { username, password } = req.body;
	if(!username || !password){
		return res.status(400).json({error: 'Username and password are required!'});
	}
	const data = await userModel.userLogin(username, password);
	if(data.status==='failed'){
		return res.status(400).json(data);
	}
	return res.status(200).json(data);
});
UserRoute.get('/:id', async (req: Request, res: Response) => {
	const userID = parseInt(req.params.id, 10);
	if(isNaN(userID)){
		return res.status(400).json({error: 'Invalid User ID'});
	}
	const user = await userModel.getUserByID(userID);
	if(!user){
		return res.status(404).json(user);
	}
	else{
		return res.status(200).json(user);
	}
});
export default UserRoute;