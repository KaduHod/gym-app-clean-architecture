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
                    include:{
                        users_permissions : {
                            include : {
                                permission : true
                            }
                        }
                    },
                    where: {
                        id:23
                    }
                } as Prisma.usersFindManyArgs
            ).main()
        )

        expect(result).toBeTruthy();

        const check = result
                        .users_permissions
                        .filter((permission:any) =>  permission.permission_id = 2);

        expect(check).toBeTruthy();
    })
})