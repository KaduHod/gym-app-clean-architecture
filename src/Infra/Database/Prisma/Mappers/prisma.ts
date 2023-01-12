import { GraphQlJson } from '../../../Resolvers/mappers/graphQl'
import { isObject } from '../../../../Helpers/Objects'
import { PrismaAlunoQueryOptions, PrismaUserQueryOptions } from '../querys'
import { Prisma } from '@prisma/client'


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
        },
        queryOption(options:PrismaUserQueryOptions): Prisma.usersFindManyArgs
        {
            return { select : options.userFields.reduce((acc:Prisma.usersSelect, curr:any) => {
                acc[curr as keyof Prisma.usersSelect] = true
                return acc
            },{})}
        }
    },
    aluno: {
        getUserFields(jsonString:GraphQlJson): string[]
        {
            const user = JSON.parse(jsonString).alunos?.user
            if(!user) return [];
            const userFields = Object.keys(user)
            return userFields.filter( (field:string) => !isObject(user[field]));
        },
        getAlunoFields(jsonString:GraphQlJson): string[]
        {
            const aluno = JSON.parse(jsonString).alunos
            const alunoFields = Object.keys(aluno)
            return alunoFields.filter((field:string) => !isObject(aluno[field]));
        },
        queryOption({
            userFields, 
            alunoFields
        }:PrismaAlunoQueryOptions): Prisma.alunosFindManyArgs
        {
            const queryOptions:Prisma.alunosFindManyArgs = {}
            let select: Prisma.alunosSelect = {}
            queryOptions.select = select
            if(alunoFields)
            {
                queryOptions.select = alunoFields.reduce((acc:Prisma.alunosSelect, curr:string) => {
                    acc[curr as keyof Prisma.alunosSelect] = true
                    return acc
                },{})
                
            }
            if(userFields && userFields.length)
            {
                let usersArgs: Prisma.usersArgs = {}
                usersArgs.select = userFields.reduce((acc:Prisma.usersSelect, curr:string) => {
                    acc[curr as keyof Prisma.usersSelect] = true
                    return acc
                },{})
                queryOptions.select.user = usersArgs
            }

            return queryOptions
        }
    }
}

export default PrismaMapper;