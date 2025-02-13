/**
 * JWT Authentication Middleware
 */
import Debug from "debug";
import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { JwtAccessTokenPayload } from "../../types/JWT.types";

// Create a new debug instance
const debug = Debug("prisma-books:jwt");

// Get environment variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const validateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
	debug("Hello from auth/jwt! 🙋😎");

	// 1. Make sure Authorization header exists, otherwise bail 🛑
	if (!req.headers.authorization) {
		debug("Authorization header missing");
		res.status(401).send({ status: "fail", data: { message: "Authorization required" }});
		return;
	}

	// 2. Split Authorization header on ` `
	// "Bearer <token>"
	const [authType, token] = req.headers.authorization.split(" ");

	// 3. Check that Authorization Type is "Bearer", otherwise bail 🛑
	if (authType.toLowerCase() !== "bearer") {
		debug("Authorization Type isn't Bearer");
		res.status(401).send({ status: "fail", data: { message: "Authorization required" }});
		return;
	}

	// 4. Verify token and extract payload, otherwise bail 🛑
	if (!ACCESS_TOKEN_SECRET) {
		debug("🛑🛑🛑 ACCESS_TOKEN_SECRET missing in environment");
		res.status(500).send({ status: "error", message: "No access token secret defined" });
		return;
	}

	try {
		const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtAccessTokenPayload;  // stupid TypeScript

		debug("Payload: %O", payload);

		// 5. Attach payload to request
		req.user = {
			id: payload.id,
			name: payload.name,
			email: payload.email,
		};

		// 6. Profit 💰🤑
		next();

	} catch (err) {
		debug("JWT Verify failed: %O", err);

		if(err instanceof TokenExpiredError) {
			res.status(401).send({status: "fail", data: { message: "Authorization token has expired" }})
		}
		res.status(401).send({ status: "fail", message: "Authorization denied" });
		return;
	}

}
