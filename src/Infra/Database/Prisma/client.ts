import { PrismaClient } from "@prisma/client";

export const client = new PrismaClient({
    rejectOnNotFound: {
        findUnique: true,
    }
})

