import { describe, expect, it } from "vitest";
import GetUsersUseCase from './getUsers'
import MysqlUserRepository from '../../../Infra/Database/Mysql/UserRepository'
import User from "../../../Domain/Entities/User";
describe('Get users use case', () => {
    it('Should query all users', async () => {
        const useCase = new GetUsersUseCase(
            new MysqlUserRepository,
            ['name', 'nickname', 'cellphone']
        )
        const users = await useCase.main()
        expect(users).toBeTruthy()
    })
})