export type CreateBookData = {
	title: string;
	pages: number;
	publisherId: number | null;
}

export type UpdateBookData = Partial<CreateBookData>;
