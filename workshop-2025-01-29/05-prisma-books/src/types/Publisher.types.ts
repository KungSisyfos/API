import { Publisher } from "@prisma/client";

export type CreatePublisherData = Pick<Publisher, "name">;

export type UpdatePublisherData = Partial<CreatePublisherData>;
