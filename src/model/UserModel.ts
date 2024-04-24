import { database, User } from '../application/database';
import escapeString from '../validation/EscapeString';
import UserExist from '../validation/UserExist';
import Auth from '../validation/Auth'

interface ApiResponse{
	status: string;
	message: string;
}

interface UserResponse<T> extends ApiResponse{
	data: T;
}

class UserModel{
	private prisma; 
	constructor(){
		this.prisma = database;
	}

	async getAllUsers(): Promise<UserResponse<User[] | null>>{
		try{
			const data = await this.prisma.user.findMany();
			return {
				status: 'success',
				message: 'success on grab users',
				data: data
			};
		}
		catch(e){
			console.error(`Error: ${e}`);
			throw e;
		}
	}

	async getUserByID(id: number): Promise<UserResponse<User | null>>{
		try{
			const data = await this.prisma.user.findFirst({
				where: {
					id: id
				}
			});
			if(data===null){
				return {
					status: 'failed',
					message: 'User not found',
					data: null
				};
			}
			return {
				status: 'success',
				message: 'success on grab user',
				data: data
			};
		}
		catch(e){
			console.error(`Error: ${e}`);
			throw e;
		}
	}

	async createUser(username: string, password: string, email: string | null = null): Promise<UserResponse<User | null>>{
		try{
			const user = escapeString(username);
			const pass = escapeString(password);
			const emails = (email) ? escapeString(email) : null;

			// Check if username already exist
			const checkUser = await UserExist(user);

			if(checkUser){
				return {
					status: 'failed',
					message: 'Username already taken',
					data: null
				};
			}
			const data = await this.prisma.user.create({
				data: {
					username: user,
					password: pass,
					email: emails
				}
			});
			return {
					status: 'succed',
					message: 'Registration success',
					data: data
			};
		}
		catch(e){
			console.error(`Error: ${e}`);
			throw e;
		}
	}

	async userLogin(username: string, password: string): Promise<UserResponse<string | null>>{
		try{
			const user = escapeString(username);
			const pass = escapeString(password);
			const checkUser = await UserExist(user);
			if(!checkUser){
				return {
					status: 'failed',
					message: 'Username not found',
					data: null
				};
			}
			const data = await this.prisma.user.findFirst({
				where: {
					username: user,
					password: pass
				}
			});
			if(!data){
				return {
					status: 'failed',
					message: 'Username or password invalid',
					data: null
				};
			}
			const userdata = {
				id: data.id,
				username: data.username
			};
			const token = Auth.sign(userdata);
			return {
					status: 'succed',
					message: 'Login Succed',
					data: token
			};
		}
		catch(e){
			console.error(`Error: ${e}`);
			throw e;
		}
	}
}
const userModel = new UserModel();
export default userModel;