import { Prisma } from "@prisma/client";
import { describe, expect, it } from "vitest";
import PrismaPersonalRepository from "../../../Infra/Database/Prisma/PrismaPersonalRepository";
import GetPersonaisUseCase from "./GetPersonais";

describe('Get personal', () => {
    it('Should bring personal', async () => {
        const useCase = new GetPersonaisUseCase(
            new PrismaPersonalRepository,
            {
                include:{
                    users_permissions : {
                        include : {
                            permission: true
                        }
                    }
                }
            } as Prisma.usersFindManyArgs
        )
        const result = await useCase.main()
       
        expect(result).toBeTruthy()
        const check = result.filter((permission:any) =>  permission.permission_id = 2)
        expect(check).toBeTruthy()
    })
})