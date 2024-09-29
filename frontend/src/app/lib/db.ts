/* this file configures and exports a single instance
of prisma client, for connecting to our Postgres database
check https://www.prisma.io/docs for more information. */

import { PrismaClient } from "@prisma/client";

const createPrismaClient = () =>
	new PrismaClient({
		log:
			process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
	});

const globalForPrisma = globalThis as unknown as {
	prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
