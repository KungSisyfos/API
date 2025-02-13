/**
 * Book Types
 */
import { Book } from "@prisma/client";

export type BookId = Pick<Book, "id">;

export type CreateBookData = Omit<Book, "id">;

export type UpdateBookData = Partial<CreateBookData>;
