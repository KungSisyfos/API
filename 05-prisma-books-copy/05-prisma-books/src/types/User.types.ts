export type CreateUserData = {
	name: string;
	email: string;
	password: string;
}

export type UpdateUserData = Partial<CreateUserData>;
