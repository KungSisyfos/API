/**
 * HTTP Basic Authentication Middleware
 */
import Debug from "debug";
import { Request, Response, NextFunction } from "express";
import { getUserByEmail } from "../../services/user_service";
import bcrypt from "bcrypt";

// Create a new debug instance
const debug = Debug("prisma-books:basic");

export const basic = async (req: Request, res: Response, next: NextFunction) => {
	debug("Hello from auth/basic! 🙋🏽");

	// 1. Make sure Authorization header exists, otherwise bail 🛑
	if(!req.headers.authorization) {
		debug("Authorization header missing");
		res.status(401).send({
			status: "fail",
			data: {
				message: "Authorization required"
			},
		});
		return;
	}

	
	// 2. Split Authorization header on ` `
	const [ authType, base64Payload ] = req.headers.authorization.split(" ");

	// 3. Check that Authorization scheme is "Basic", otherwise bail 🛑
	if(authType.toLowerCase() !== "basic"){
		debug("Authorization Type isn't a Basic bitch");
		res.status(401).send({
			status: "fail",
			data: {
				message: "Authorization required"
			}
		});
		return;
	}


	// 4. Decode credentials from base64 => ascii
	const asciiString = Buffer.from(base64Payload, "base64").toString("utf8");

	// 5. Split credentials on `:`
	const [ email, plainTextPassword ] = asciiString.split(":");
	if(!email || !plainTextPassword) {
		debug("user did not send email or password");
		res.status(401).send({
			status: "fail",
			data: {message: "Authorization required"}
		});
		return;
	}

	// 6. Get user from database, otherwise bail 🛑

	const user = await getUserByEmail(email);
	

	if(!user){
		debug("there is no user ", user);
		res.status(401).send({
			status: "fail",
			data: { message:"Authorization required" }
		})
		return;
	}

	// 7. Verify hash against credentials, otherwise bail 🛑
	const password_correct = await bcrypt.compare(plainTextPassword, user.password);

	if(!password_correct){
		debug("Password for user %s was not correct", email);
		res.status(401).send({status: "fail", data: {message: "Authorization required"}});
		return;
	}
	debug("User password was correct!");
	// 8. Attach user to request
	req.body = user;


	// 9. Profit 💰🤑
	next();
}
