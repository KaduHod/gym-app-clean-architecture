import { GraphQlJson } from '../../../Resolvers/mappers/graphQl'
import { isObject } from '../../../../Helpers/Objects'
import { PrismaAlunoQueryOptions } from '../querys'


const PrismaMapper = {
    jsonToQuery(jsonString:GraphQlJson): any
    {
        const json = JSON.parse(jsonString)
        console.log(json)
    },
    user: {
        getFields(jsonString:GraphQlJson): string[]
        {
            const users = JSON.parse(jsonString).users
            const userFields = Object.keys(users)
            return userFields.filter( (field:string) => !isObject(users[field]));
        }
    },
    aluno: {
        getUserFields(jsonString:GraphQlJson): string[]
        {
            const user = JSON.parse(jsonString).alunos.user
            const userFields = Object.keys(user)
            return userFields.filter( (field:string) => !isObject(user[field]));
        },
        getAlunoFields(jsonString:GraphQlJson): string[]
        {
            const aluno = JSON.parse(jsonString).alunos
            const alunoFields = Object.keys(aluno)
            return alunoFields.filter((field:string) => !isObject(aluno[field]));
        },
        queryOption(options:PrismaAlunoQueryOptions)
        {
            const queryOptions = {};
            if(options.userFields)
            {

            }
            if(options.alunoFields)
            {

            }
        }
    }
}

export default PrismaMapper;