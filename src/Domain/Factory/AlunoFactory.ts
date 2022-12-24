import { faker } from '@faker-js/faker'
import { PK } from '../../App/Repositories/Repository'
import Aluno from '../Entities/Aluno'
import { TAluno } from '../Entities/Entities'

export const AlunoFactory = {
    create({user_id, personal_id}:TAluno): Aluno 
    {
        return new Aluno({
            user_id, personal_id
        })
    },
    createFromPartialAttributes({user_id, personal_id}:TAluno): Aluno
    {
        return new Aluno({
            user_id, personal_id
        })
    },
    createRandom({user_id, personal_id}:TAluno): Aluno 
    {
        return new Aluno({
            user_id, personal_id
        })
    }
}