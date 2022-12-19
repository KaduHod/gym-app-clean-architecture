import { faker } from '@faker-js/faker'
import { PK } from '../../App/Repositories/Repository'
import Aluno from '../Entities/Aluno'
import { TAluno } from '../Entities/Entities'

export const AlunoFactory = {
    create(userId:PK, personalId?:PK): Aluno 
    {
        return new Aluno({
            userId, personalId
        })
    },
    createFromPartialAttributes(userId:PK, personalId?:PK): Aluno
    {
        return new Aluno({
            userId, personalId
        })
    },
    createRandom(userId:PK, personalId?:PK): Aluno 
    {
        return new Aluno({
            userId, personalId
        })
    }
}