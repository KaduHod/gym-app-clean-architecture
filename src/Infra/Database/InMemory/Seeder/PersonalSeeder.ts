import { PersonalFactory } from "../../../../Domain/Factory/PersonalFactory"
import Personal from "../../../../Domain/Entities/Personal"
import { writeFile } from "fs/promises"
import InMemoryUserRepository from "../UserRepository"
import InMemoryPersonalRepository from "../PersonalRepository"
import { PK } from "../../../../App/Repositories/Repository"
import User from "../../../../Domain/Entities/User"

export default function PersonalSeeder(){
    const path = 'src/Infra/Database/InMemory/Data/Personais.json'
    const personais:Personal[] = []
    const userRepository = new InMemoryUserRepository()
    const personalRepo = new InMemoryPersonalRepository()

    const getUsersIds = async () => {
        const users = await userRepository.findAll();
        return users.filter((u, i) => i < (users.length / 2))
                    .map((user:User) => user.id || '');
    }

    const createPersonais = async () => {
        (await getUsersIds())
                .forEach( (id:PK) => personais.push(PersonalFactory.createRandom(id)))
    }
    
    const save = async () => {
        await personalRepo.save(personais)
    }

    const handler = async () => {
        await createPersonais()
        await save()
    }   

    return {handler}
}