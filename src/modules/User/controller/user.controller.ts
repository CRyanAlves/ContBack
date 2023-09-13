import { Request, Response } from "express";
import UserService from "../services/UserService";


class UserController {
	async loginUser(req: Request, res: Response){
		const {email, password} = req.body;
		try {
		const token = await new UserService().loginUser(email, password);
		res.json({token});
		} catch(err) {
				res.status(401).send("Login Failed");
		}
}
	async signUpUser(req: Request, res: Response) {
		try{
		const {email, name, password, telUser, telEmgUser,} = req.body
		await new UserService().signUpUser(email, name, password, telUser, telEmgUser);
		res.json("Bem criado!")
	}
	catch (error) {
        console.log(`erro no controller signupuser ${error}`)
    }
}

}

export default UserController;
