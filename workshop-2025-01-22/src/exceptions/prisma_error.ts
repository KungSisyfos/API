import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

export const handlePrismaError = (err: unknown) => {
	if (err instanceof PrismaClientInitializationError) {
		return { status: 500, message: "Error initializing connection to database" };

	} else if (err instanceof PrismaClientKnownRequestError) {
		if (err.code === "P2021") {
			return { status: 500, message: "Database table does not exist" };

		} else if (err.code === "P2025") {
			return { status: 404, message: "Not Found" };
		}

	} else if (err instanceof PrismaClientValidationError) {
		return { status: 400, message: "Validation Error" };

	}

	return { status: 500, message: "Something went wrong when querying the database" };
}
