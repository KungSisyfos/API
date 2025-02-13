export type CreateAuthorData = {
	name: string;
	birthyear: number | null;
}

export type UpdateAuthorData = Partial<CreateAuthorData>;
