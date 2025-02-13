import { model, Schema, Document } from "mongoose";

export interface PersonDocument extends Document {
	name: string;
}

const PersonSchema = new Schema<PersonDocument>({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: [3, "has to be at least 3 chars"],
	},
});

export const Person = model("Person", PersonSchema);

