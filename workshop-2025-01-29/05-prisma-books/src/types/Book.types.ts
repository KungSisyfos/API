import { Book } from "@prisma/client";


export type CreateBookData = Omit<Book, "id">

export type UpdateBookData = Partial<CreateBookData>;
