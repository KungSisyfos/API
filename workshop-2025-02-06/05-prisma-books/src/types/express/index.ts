/**
 * Extend types inside the Express namespace
 */

import { AuthenticatedUser } from "../Auth.types";

declare global {
	namespace Express {
		export interface Request {
			user?: AuthenticatedUser;
		}
	}
}
