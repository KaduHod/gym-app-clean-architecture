export type PrismaAlunoQueryOptions = {
    userFields?: string[], 
    alunoFields?: string[]
}

import { Prisma } from "@prisma/client"


export type PrismafindManyOptions = {
    select?: string[]
    include?: object[]
    where?: object 
    take?: number
}

export type PrismaUserSelect = {
    id?: boolean
    name?: boolean
    nickname?: boolean
    email?: boolean
    password?: boolean
}

export type PrismaUserWhere = {
    id?: any
    name?: any
    nickname?: any
    email?: any
    password?: any
}

export type PrismaUserQueryOptions = {
    select?: PrismaUserSelect
    where?: PrismaUserWhere
}


export type PrismaAlunoSelect = {
    id?: boolean
    user_id?: boolean
    personal_id?: boolean
}

export type PrismaAlunoWhere = {
    id:? any
    user_id?: any
    personal_id?: any
}

export type PrismaAlunoInclude = {
    user?: boolean | { select:PrismaUserSelect }
    personal:? boolean
}

export type PrismaAlunoQueryOptions = {
    select?: PrismaAlunoSelect
    where?: PrismaAlunoWhere
    include?: PrismaAlunoInclude
}

export type PrismaPersonalSelect = {
    id?: boolean 
    user_id?: boolean
}

export type PrismaPersonalWhere = {
    id?: any
    user_id?: any
}

export type PrismaPersonalInclude = {
    user?: boolean | { select : PrismaPersonalSelect }
    alunos:? boolean | { select : PrismaAlunoSelect }
}

export type PrismaPersonalQueryOptions = {
    select?: PrismaPersonalSelect
    where?: PrismaPersonalWhere
}