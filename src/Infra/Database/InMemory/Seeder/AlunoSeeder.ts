import Aluno from "../../../../Domain/Entities/Aluno";
import { TAluno } from "../../../../Domain/Entities/Entities";
import { faker } from "@faker-js/faker";
import { AlunoFactory } from "../../../../Domain/Factory/AlunoFactory";
import InMemoryUserRepository from "../UserRepository";
import User from "../../../../Domain/Entities/User";
import InMemoryPersonalRepository from "../PersonalRepository";
import { TPersonal } from "../../../../Domain/Entities/Entities";
import InMemoryAlunoRepository from "../AlunoRepository";

export default function AlunoSeeder(){
    const userRepo = new InMemoryUserRepository()
    const personalRepo = new InMemoryPersonalRepository()
    const alunosRepo = new InMemoryAlunoRepository()
    const alunos:Aluno[] = []

    const createAlunos = async () => {
        const usersQtd = (await userRepo.findAll()).length
        const usersIds = (await userRepo.findWhere((user:User) => {
            if(user.id && user.id > (usersQtd/2)) return true
        }))?.map((user:User) => user.id)
        const personaisId = (await personalRepo.findAll()).map((personal:TPersonal) => personal.id)

        usersIds?.forEach((id, i) => {
            alunos.push(AlunoFactory.create(id || 'Erro no alunoId', personaisId[i]))
        })
    }

    const save = async () => {
        await alunosRepo.save(alunos)
    }

    const handler = async () => {
        await createAlunos()
        await save()
    }

    return {handler}
}