import { describe, expect, it } from "vitest";
import MysqlPersonalRepository from "../../../Infra/Database/Mysql/PersonalRepository";
import GetPersonalUseCase from "./GetPersonal";

describe('Get personal', () => {
    it('Should bring persnal with user', async () => {
        const useCase = new GetPersonalUseCase(
            new MysqlPersonalRepository,
            {
                attrs: {'personais.id':10},
                fields: ['id', 'created_at'],
                userFields: ['name', 'nickname', 'email'],
                first: false
            }
        )
        const result = await useCase.main()
        expect(result).toBeTruthy()
    })
})