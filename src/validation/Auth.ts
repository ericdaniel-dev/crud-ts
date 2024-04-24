import jwt from 'jsonwebtoken';
require('dotenv').config();

interface userDATA{
	userID: number;
	username: string;
}

class Authentication{
	private secret: string;
	constructor(){
		this.secret = process.env.SECRET || '';
	}
	sign(user: {id: number; username: string}, expires="2h"): string{
		const payload: userDATA = {
			userID: user.id,
			username: user.username
		};
		return jwt.sign(payload, this.secret, { expiresIn: expires});
	}
	verify(token: string): boolean{
		try{
			jwt.verify(token, this.secret);
			return true;
		}
		catch(e){
			console.log(`Error JWT: ${e}`);
			return false;
		}
	}
	decode(token: string): userDATA | null {
		try{
			const decodedToken = jwt.decode(token) as userDATA;
			return decodedToken;
		}
		catch(e){
			console.error(`Error: ${e}`);
			return null;
		}
	}
}

const Auth = new Authentication();

export default Auth;