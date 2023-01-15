import { GraphQlJson } from '../../../Resolvers/mappers/graphQl'
import { isObject } from '../../../../Helpers/Objects'
import { Prisma, exercicios } from '@prisma/client'
import { GraphQlObject } from '../../../Web/resolvers'
import { 
    PrismaAlunoQueryOptions, 
    PrismaExerciseQueryOptions, 
    PrismaUserQueryOptions 
} from '../querys'
import { Exercicio, TMuscle } from '../../../../Domain/Entities/Entities'
import { ExerciseFactory } from '../../../../Domain/Factory/ExerciseFactory'



const PrismaMapper = {
    user: {
        getFields(body:GraphQlObject): string[]
        {
            const users = body.users
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
        getUserFields(body:GraphQlObject): string[]
        {
            const user = body.alunos?.user
            if(!user) return [];
            const userFields = Object.keys(user)
            return userFields.filter( (field:string) => !isObject(user[field]));
        },
        getAlunoFields(body:GraphQlObject): string[]
        {
            const aluno = body.alunos
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
    },
    exercicio: {
        getFields(body:GraphQlObject){
            const exercicio = body.exercises
            const exercicioFields = Object.keys(exercicio)
            return exercicioFields.filter((field:string) => !isObject(exercicio[field]))
        },
        getMuscleFields(body:GraphQlObject){
            const muscle = body.exercises?.muscles
            if(!muscle) return []
            const muscleFields = Object.keys(muscle)
            return muscleFields.filter((field:string) => !isObject(muscle[field]))
        },
        queryOption({
            exercicioFields, 
            muscleFields
        }:PrismaExerciseQueryOptions): Prisma.exerciciosFindManyArgs
        {
            let queryOptions:Prisma.exerciciosFindManyArgs = {select:{}}
            if(exercicioFields)
            {
                queryOptions.select = exercicioFields.reduce((acc: Prisma.exerciciosSelect, curr: string) => {
                    acc[curr as keyof Prisma.exerciciosSelect] = true
                    return acc
                }, {})
            }

            if(muscleFields)
            {
                if(!queryOptions.select) queryOptions.select = {} as Prisma.exerciciosSelect
                if(!queryOptions.select.muscles) queryOptions.select.muscles = {} as Prisma.exercicios$musclesArgs

                queryOptions.select.muscles = muscleFields.reduce((acc: Prisma.exercicios$musclesArgs, curr: string) => {
                    if(curr === 'role'){
                        if(!acc.select) acc.select = {} as Prisma.exercise_muscleSelect
                        acc.select.role = true
                    }else {
                        if(!acc.select) acc.select = {} as Prisma.exercise_muscleSelect
                        if(!acc.select.muscle) acc.select.muscle = {} as Prisma.musclesArgs 
						if(typeof acc.select.muscle === 'boolean') {
							throw new Error('Erro de tipagem do typescript que não identificou tipo Prisma.musclesArgs')
						}
                        if(!acc.select.muscle.select) acc.select.muscle.select = {} as Prisma.musclesSelect
                        acc.select.muscle.select[curr as keyof Prisma.musclesSelect] = true
                    }
                    return acc
                }, {})
            }

            return queryOptions
        },
        toArrExercicios(exercicios: any[]): Exercicio[]
        {
            return exercicios.map(({muscles, ...item}:any) => {
                muscles = muscles.map(({muscle, role}:any) => ({...muscle, role})) as TMuscle
                return ExerciseFactory.create(item, muscles) 
            })
        }
    }
}

export default PrismaMapper;