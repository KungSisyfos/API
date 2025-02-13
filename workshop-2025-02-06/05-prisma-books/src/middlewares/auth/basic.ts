/**
 * HTTP Basic Authentication Middleware
 */
import bcrypt from "bcrypt";
import Debug from "debug";
import { Request, Response, NextFunction } from "express";
import { getUserByEmail } from "../../services/user_service";

// Create a new debug instance
const debug = Debug("prisma-books:basic");

export const basic = async (req: Request, res: Response, next: NextFunction) => {
	debug("Hello from auth/basic! 🙋🏽");

	// 1. Make sure Authorization header exists, otherwise bail 🛑
	if (!req.headers.authorization) {
		debug("Authorization header missing");
		res.status(401).send({ status: "fail", data: { message: "Authorization required" }});
		return;
	}

	// 2. Split Authorization header on ` `
	// "Basic am5AdGhlaGl2ZXJlc2lzdGFuY2UuY29tOmFiYzEyMw=="
	// [0] => "Basic"
	// [1] => "am5AdGhlaGl2ZXJlc2lzdGFuY2UuY29tOmFiYzEyMw=="
	debug("Authorization header: %o", req.headers.authorization);
	const [authType, base64Payload] = req.headers.authorization.split(" ");

	// 3. Check that Authorization scheme is "Basic", otherwise bail 🛑
	if (authType.toLowerCase() !== "basic") {
		debug("Authorization Type isn't Basic");
		res.status(401).send({ status: "fail", data: { message: "Authorization required" }});
		return;
	}

	// 4. Decode credentials from base64 => ascii
	const decodedPayload = Buffer.from(base64Payload, "base64").toString("utf8");
	// decodedPayload = "jn@thehiveresistance.com:abc123"
	debug("decodedPayload: %s", decodedPayload);

	// 5. Split credentials on `:`
	const [email, plaintextPassword] = decodedPayload.split(":");
	debug("Email: %s", email);
	debug("Password: %s", plaintextPassword);

	// 5.5. Check that user sent email and password
	// if not email OR not plaintextPassword
	if (!email || !plaintextPassword) {
		debug("User did not send email or password");
		res.status(401).send({ status: "fail", data: { message: "Authorization required" }});
		return;
	}

	// 6. Get user from database, otherwise bail 🛑
	const user = await getUserByEmail(email);
	if (!user) {
		debug("User %s does not exist", email);
		res.status(401).send({ status: "fail", data: { message: "Authorization required" }});
		return;
	}

	// 7. Verify hash against credentials, otherwise bail 🛑
	debug("👌🏻 User did exist: %s", email);
	const password_correct = await bcrypt.compare(plaintextPassword, user.password);  // user.password is the hashed pwd from the database
	if (!password_correct) {
		debug("Password for user %s was not correct", email);
		res.status(401).send({ status: "fail", data: { message: "Authorization required" }});
		return;
	}
	debug("✅ Password for user %s was correct 🥳", email);

	// 8. Attach user to request
	req.user = user;

	// 9. Profit 💰🤑
	next();
}
