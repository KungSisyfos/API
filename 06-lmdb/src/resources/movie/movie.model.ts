import { model, Schema, Document } from "mongoose";
import { PersonDocument } from "../person/person.model";



export interface MovieDocument extends Document {
	title: string;
	runtime: number | null;
	release_year?: number;
	genres?: string[];
	watched: Date;
	director: PersonDocument["_id"] | null;
	actors: PersonDocument["_id"][];
}

const currentYear = new Date().getFullYear();



const MovieSchema = new Schema<MovieDocument>({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: [2, "has to be at least two characters"],
	},
	runtime: {
		type: Number,
		default: null,
		// min: [1, "Has to be at least one minute"],
		validate(value: number | null) {
			if (value !== null && value < 1) {
				throw new Error("Negative runtime doesn't exist");
			}
		}

	},
	release_year: {
		type: Number,
		min: [1888, "has to be 1888 or later"],
		max: [currentYear, "cannot be in the future"],
	},

	genres: {
		type: [String],
		default: [],
		lowercase: true,
		set(genres: string[]) {
			return genres.map(genre => genre.toLocaleLowerCase() );
		},
	},

	watched: {
		type: Date,
		default(){
			return Date.now();
		},
		set(timestamp: number){
			return timestamp + 1000;
		}
	},
	director: {
		type: Schema.Types.ObjectId,
		ref: "Person",
		default: null,
	},
	actors: {
		type: [Schema.Types.ObjectId],
		ref: "Person",
		default: [],
	}
});

export const Movie = model("Movie", MovieSchema);
