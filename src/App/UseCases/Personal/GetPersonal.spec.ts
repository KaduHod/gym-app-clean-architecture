import { describe, expect, it } from "vitest";
import PrismaPersonalRepository from "../../../Infra/Database/Prisma/PrismaPersonalRepository";
import GetPersonalUseCase  from './GetPersonal'
import {Prisma} from '@prisma/client'

describe('Should test get Personal test', async () => {
    const repo = new PrismaPersonalRepository;
    it('Should get personal and user', async () => {
        const result = await (
            new GetPersonalUseCase(
                repo,
                {
                    select : {
                        id:true,
                        users:{
                            select : {
                                id:true,
                                name:true
                            }
                        }
                    },
                    where: {
                        id:23
                    }
                } as Prisma.personaisFindManyArgs
            ).main()
        )

        expect(result).toBeTruthy()
        expect(result.users).toBeTruthy()
    })
})