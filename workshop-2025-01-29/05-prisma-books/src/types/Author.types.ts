import { Author } from "@prisma/client";

// export type Author =  {
// 	id: number;
// 	name: string;
// 	birthyear: number;
// }

export type AuthorId = Pick<Author, "id">;

export type CreateAuthorData = Omit<Author, "id">;

export type UpdateAuthorData = Partial<CreateAuthorData>;
