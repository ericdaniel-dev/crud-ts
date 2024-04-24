import { PrismaClient, User } from "@prisma/client";

const database = new PrismaClient();

export { database, User };