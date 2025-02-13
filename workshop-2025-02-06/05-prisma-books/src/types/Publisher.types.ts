/**
 * Publisher Types
 */
import { Publisher } from "@prisma/client";

export type CreatePublisherData = Omit<Publisher, "id">;

export type UpdatePublisherData = Partial<CreatePublisherData>;
