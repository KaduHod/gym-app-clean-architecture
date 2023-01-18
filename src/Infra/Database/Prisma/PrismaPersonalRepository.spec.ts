import { Prisma, users } from "@prisma/client";
import { describe, expect, it } from "vitest";
import { PersonalFactory } from "../../../Domain/Factory/PersonalFactory";
import { UserFactory } from "../../../Domain/Factory/UserFactory";
import PrismaPersonalRepository from "./PrismaPersonalRepository";

describe('Test personal repository', () => {
    const personalRepository = new PrismaPersonalRepository;
    it('It should bring all personais', async () => {
        const personais = await personalRepository.findAll({
            select: {
                users_permissions : {
                    select : {
                        permission_id : true,
                        permission: {
                            select : {
                                title : true
                            }
                        } as Prisma.permissionsArgs
                    } as Prisma.users_permissionsSelect
                } as Prisma.users$users_permissionsArgs
            } as Prisma.usersSelect
        } as Prisma.usersFindManyArgs) as any

        expect(personais).toBeTruthy()
        if(!personais) return

        for(const personal of personais)
        {
            const check = personal.users_permissions.find((permission:any) => {
                return permission.permission_id === 2 && permission.permission.title === 'personal'
            })

            if(!check) throw new Error('PrismaPersonalRepository bring users that is not personal')
        }
    })

    it('Should bring personais by attributes', async () => {
        const personais = await personalRepository.findBy({
            select:{
                users_permissions : {
                    select : {
                        permission_id:true,
                        permission: {
                            select : {
                                title:true
                            }
                        }
                    }
                }
            } as Prisma.usersSelect,
            where : {
                name : 'Carlos',
                nickname: 'KaduHod2'
            }
        } as Prisma.usersFindManyArgs, false) as any ;

        expect(personais).toBeTruthy()
        if(!personais) return

        for(const personal of personais)
        {
            const check = personal.users_permissions.find((permission:any) => {
                return permission.permission_id === 2 && permission.permission.title === 'personal'
            })

            if(!check) throw new Error('PrismaPersonalRepository bring users that is not personal')
        }
    })

    it('Should save personal as personal', async () => {
        const newPersonal = UserFactory.createRandom()
        const saveQuery = await personalRepository.save(newPersonal) as any;
        expect(saveQuery).toBeTruthy()
        expect(saveQuery.users_permissions[0].permission_id).toEqual(2)
        expect(saveQuery.users_permissions[0].permission.title).toEqual('personal')
    })

    it('Should bring personal by pk', async () => {
        const personal = await personalRepository.findByPK(1);
        
    })
})