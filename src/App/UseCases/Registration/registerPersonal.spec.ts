import { describe, expect, it } from "vitest";
import RegisterPersonal from './registerPersonal'
import PrismaPersonalRepository from "../../../Infra/Database/Prisma/PrismaPersonalRepository";
import { UserFactory } from "../../../Domain/Factory/UserFactory";

describe('Register personal', () => {
    const personalRepo = new PrismaPersonalRepository;

    it('Should save personal', async () => {   
        const personal = UserFactory.createRandom()   
        const useCase = new RegisterPersonal(
            personalRepo,
            {...personal, password:'26352135'}
        )
        const registrationResult = await useCase.main() 
        expect(registrationResult).toBeTruthy()
    })
})