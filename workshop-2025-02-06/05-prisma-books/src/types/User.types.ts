/**
 * User Types
 */
import { User } from "@prisma/client";

export type CreateUserData = Omit<User, "id">;

export type UpdateUserData = Partial<CreateUserData>;
