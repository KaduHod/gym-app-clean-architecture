import { describe, expect, it } from "vitest";
import PrismaUserRepository from "./UserPrismaRepository";

describe('Teste user prisma repository', () => {
    const userRepository = new PrismaUserRepository()
    it('Should get all users', async () => {
        const users = await userRepository.findAll()
        expect(users).toBeTruthy()
    })

    it('Should get users with select fields', async () => {
        const options = {select:{id:true, name:true}};
        const users = await userRepository.findAll(options)
        expect(users).toBeTruthy()
    })

})