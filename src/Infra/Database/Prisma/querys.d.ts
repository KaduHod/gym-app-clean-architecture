export type PrismaAlunoQueryOptions = {
    userFields?: string[], 
    alunoFields?: string[]
}

export type PrismaUserQueryOptions = {
    userFields: string[]
}

export type PrismaExercisesQueryOptions = {
    exercicioFields?: string[],
    muscleFields?: string[]
}

export type PrismaPersonalQueryOptions = {
    personalFields?: string[],
    userFields?: string[],
    alunosFields?: string[],
    alunosUserFields?: string[]
}