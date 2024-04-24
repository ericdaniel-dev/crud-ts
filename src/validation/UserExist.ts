import { database, User } from '../application/database';

async function UserExist(user: string): Promise<boolean>{
	try{
		const data = await database.user.findFirst({
			where: {
				username: user
			}
		});
		if(!data){
			return false;
		}
		return true;
	}
	catch(e){
		console.error(`Error: ${e}`);
		throw e;
	}
}


export default UserExist;