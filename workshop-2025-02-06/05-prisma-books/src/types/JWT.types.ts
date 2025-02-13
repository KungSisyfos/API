/**
 * JWT Payload Types
 */
import { JwtPayload } from "jsonwebtoken";

export interface JwtAccessTokenPayload extends JwtPayload{
	id: number;
	name: string | null;
	email: string;
}

export interface JwtRefreshTokenPayload extends JwtPayload {
	id: number;
}
