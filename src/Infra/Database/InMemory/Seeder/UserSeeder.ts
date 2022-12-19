import { UserFactory } from "../../../../Domain/Factory/UserFactory"
import { writeFile, readFile } from "fs/promises"
import User from "../../../../Domain/Entities/User"
import InMemoryUserRepository from "../UserRepository"

export default function seed(){
    const path = 'src/Infra/Database/InMemory/Data/Users.json'
    const userRepo = new InMemoryUserRepository()
    const users:User[] = []

    const createUsers = () => {
        while (users.length < 20) {
            users.push(UserFactory.createRandom())   
        }
    }
    
    const save = async () => {
        await userRepo.save(users)
    }

    const handler = async () => {
        createUsers()
        await save()
    }   

    return {
        handler
    }
}