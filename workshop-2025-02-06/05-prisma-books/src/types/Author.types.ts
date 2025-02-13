/**
 * Author Types
 */
import { Author } from "@prisma/client";

export type AuthorId = Pick<Author, "id">;

export type CreateAuthorData = Omit<Author, "id">;

export type UpdateAuthorData = Partial<CreateAuthorData>;
