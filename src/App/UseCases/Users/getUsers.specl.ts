import { describe, expect, it } from "vitest";
import GetUsersUseCase from './getUsers'
import MysqlUserRepository from '../../../Infra/Database/Mysql/UserRepository'
import User from "../../../Domain/Entities/User";
import UserPrismaRepository from "../../../Infra/Database/Prisma/UserPrismaRepository";
describe('Get users use case', () => {
    it('Should query all users', async () => {
        const useCase = new GetUsersUseCase(
            new MysqlUserRepository,
            ['name', 'nickname', 'cellphone']
        )
        const users = await useCase.main()
        expect(users).toBeTruthy()
    })
    it('Should query all users with prisma ORM', async () => {
        const useCase = new GetUsersUseCase(
            new UserPrismaRepository,
            ['name', 'nickname', 'cellphone']
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
    it('Should query all users with prisma ORM without empty fields', async () => {
        const useCase = new GetUsersUseCase(
            new UserPrismaRepository,
            []
        )
        const users = await useCase.main()
        expect(users).toBeTruthy()
    })
})