import { describe, expect, it } from "vitest";
import PrismaUserRepository from "../../../Infra/Database/Prisma/PrismaUserRepository";
import GetUserUseCase from "./GetUser";

describe('Should test get user use case', () => {
    const repo = new PrismaUserRepository();
    it('Should bring user by id', async () => {
        const useCase = new GetUserUseCase(
            repo,
            {where:{id:10}},
            (user:any) => user
        )

        const result = await useCase.main()
       
        expect(result).toBeTruthy()
    })
    it('Should test get users with selections of fields', async () => {
        const useCase = new GetUserUseCase(
            repo,
            {
                select: {
                    id:true,
                    name:true
                },
                where:{id:10}
            },
            (user:any) => user
        )

        const result = await useCase.main()
        expect(result).toBeTruthy()
    })
})