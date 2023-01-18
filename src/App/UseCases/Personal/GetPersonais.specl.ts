import { describe, expect, it } from "vitest";
import KnexPersonalRepository from "../../../Infra/Database/Knex/KnexPersonalRepository";
import GetPersonaisUseCase from "./GetPersonais";

describe('Get personal', () => {
    it('Should bring persnal with user', async () => {
        const useCase = new GetPersonaisUseCase(
            new KnexPersonalRepository,
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