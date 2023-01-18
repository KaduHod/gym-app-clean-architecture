import { describe, expect, it } from "vitest";
import GetUsersUseCase from './getUsers'
import UserPrismaRepository from "../../../Infra/Database/Prisma/PrismaUserRepository";

describe('Get users use case', () => {
    it('Should query all users with prisma ORM', async () => {
        const useCase = new GetUsersUseCase(
            new UserPrismaRepository,
            {
                select:{
                    name: true,
                    nickname: true,
                    cellphone: true
                }
            }
        )
        const users = await useCase.main()
        expect(users).toBeTruthy()
    })
    it('Should query all users with prisma ORM without fields', async () => {
        const useCase = new GetUsersUseCase(
            new UserPrismaRepository
        )
        const users = await useCase.main()
        expect(users).toBeTruthy()
    })
    
})