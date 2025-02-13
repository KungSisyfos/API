/**
 * Register Controller
 */
import bcrypt from "bcrypt";
import Debug from "debug";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { StringValue } from "ms";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { handlePrismaError } from "../exceptions/prisma";
import { createUser, getUserByEmail, getUserById } from "../services/user_service";
import { JwtAccessTokenPayload, JwtRefreshTokenPayload } from "../types/JWT.types";
import { CreateUserData } from "../types/User.types";

// Create a new debug instance
const debug = Debug("prisma-books:register_controller");

// Get environment variables
const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME as StringValue || "15min";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME as StringValue || "1";
const REFRESH_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

interface LoginRequestBody {
	email: string;
	password: string;
}

/**
 * Log in a user
 *
 * POST /login
 */
export const login = async (req: Request, res: Response) => {

	const validationErrors = validationResult(req);
	if(!validationErrors.isEmpty()){
		res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		});
		return;
	}
	// get (destructure) email and password from request body
	const { email, password }: LoginRequestBody = matchedData(req);


	// find user with email, otherwise bail 🛑
	const user = await getUserByEmail(email);
	if (!user) {
		debug("User %s does not exist", email);
		res.status(401).send({ status: "fail", data: { message: "Authorization required" }});
		return;
	}

	// verify credentials against hash, otherwise bail 🛑
	const password_correct = await bcrypt.compare(password, user.password);
	if (!password_correct) {
		debug("Password for user %s was not correct", email);
		res.status(401).send({ status: "fail", data: { message: "Authorization required" }});
		return;
	}
	debug("✅ Password for user %s was correct 🥳", email);

	// construct jwt-payload
	const payload: JwtAccessTokenPayload = {
		id: user.id,
		name: user.name,
		email: user.email,
	}

	// sign payload with access-token secret and get access-token
	if (!ACCESS_TOKEN_SECRET) {
		debug("🛑🛑🛑 ACCESS_TOKEN_SECRET missing in environment");
		res.status(500).send({ status: "error", message: "No access token secret defined" });
		return;
	}
	const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
		expiresIn: ACCESS_TOKEN_LIFETIME,
	});

	// construct jwt-refresh-payload
	const refresh_payload: JwtRefreshTokenPayload = {
		id: user.id,
	}

	if (!REFRESH_TOKEN_SECRET) {
		debug("🛑🛑🛑 ACCESS_TOKEN_SECRET missing in environment");
		res.status(500).send({ status: "error", message: "No access token secret defined" });
		return;
	}
	
	const refresh_token = jwt.sign(refresh_payload, REFRESH_TOKEN_SECRET, {
		expiresIn: REFRESH_TOKEN_LIFETIME,
	});

	res.cookie("refresh_token", refresh_token, {
		httpOnly: true,
		sameSite: "strict",
		path: "/refresh",
	});

	// respond with access-token
	res.send({
		status: "success",
		data: {
			access_token,
		},
	});
};

/**	
 * Refresh login
 * 
 * /refresh
 */
export const refresh = async (req: Request, res: Response) => {
	const refresh_token: string | undefined = req.cookies.refresh_token;

	if(!refresh_token){
		debug("Refresh token missing")
		res.status(401).send({status: "fail", data: {
			message: "Authorization Required"
		}});
		return;
	}

	if(!REFRESH_TOKEN_SECRET){
		debug("Missing REFRESH_TOKEN_SECRET in environement");
		res.status(500).send({status: "fail", data: {message: "No refresh token secret defined"}});
		return;
	}
	
	let refresh_payload: JwtRefreshTokenPayload;

	try {

		refresh_payload = jwt.verify(refresh_token, REFRESH_TOKEN_SECRET) as JwtRefreshTokenPayload;
		
	} catch (err) {
		debug("JWT Refresh Verify failed: %O", err);

		// if token has expired, let the user know
		if (err instanceof TokenExpiredError) {
			res.status(401).send({ status: "fail", message: "Refresh token has expired" });
			return;
		}

		res.status(401).send({ status: "fail", message: "Authorization denied" });
		return;
		
	}

	
	const user = await getUserById(refresh_payload.id);

	if(!user){
		debug("User with id %d does not exist");
		res.status(401).send({status: "fail", data: { message: "Authorization Required"}});
		return;
	}

	const access_payload: JwtRefreshTokenPayload = {
		id: user.id,
		email: user.email,
		password: user.password,
	}
	if (!ACCESS_TOKEN_SECRET) {
		debug("🛑🛑🛑 ACCESS_TOKEN_SECRET missing in environment");
		res.status(500).send({ status: "error", message: "No access token secret defined" });
		return;
	}

	const access_token = jwt.sign(access_payload, ACCESS_TOKEN_SECRET, {
		expiresIn: ACCESS_TOKEN_LIFETIME,
	});
	



	res.send({
		status: "success",
		data: {
			access_token,
		},
	});
}


/**
 * Register a new user
 *
 * POST /register
 */
export const register = async (req: Request, res: Response) => {
	// Validate incoming data
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		});
		return;
	}

	// Get only the validated data from the request
	const validatedData: CreateUserData = matchedData(req);
	debug("validatedData: %O", validatedData);

	// Calculate a hash + salt for the password
	const hashed_password = await bcrypt.hash(validatedData.password, SALT_ROUNDS);
	debug("plaintext password:", validatedData.password);
	debug("hashed password:", hashed_password);

	// Create the user in the database
	try {
		// plz computah, create user, mkai?
		const user = await createUser({
			...validatedData,
			password: hashed_password,
		});

		// Respond with 201 Created + status success
		res.status(201).send({ status: "success", data: user });

	} catch (err) {
		debug("Error when trying to create User %o: %O", validatedData, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}
