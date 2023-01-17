import { GraphQlJson } from '../../../Resolvers/mappers/graphQl'
import { isObject } from '../../../../Helpers/Objects'
import { Prisma, exercicios } from '@prisma/client'
import { GraphQlObject } from '../../../Web/resolvers'
import { 
    PrismaAlunoQueryOptions, 
    PrismaExercisesQueryOptions, 
    PrismaUserQueryOptions 
} from '../querys'
import { Exercicio, TExercicio, TMuscle } from '../../../../Domain/Entities/Entities'
import { ExerciseFactory } from '../../../../Domain/Factory/ExerciseFactory'
import PrismaExercicioRepository from '../PrismaExercicioRepository'
import Muscle from '../../../../Domain/Entities/Muscle'



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
    exercicios: {
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
        }:PrismaExercisesQueryOptions): Prisma.exerciciosFindManyArgs
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
    },
    exercicio: {
        getFields(body:GraphQlObject){
            const exercicio = body?.exercise
            if(!exercicio) return []
            return Object.keys(exercicio).filter( key => !isObject(exercicio[key]));
        },
        getMuscleFields(body:GraphQlObject){
            const muscle = body.exercise?.muscles
            if(!muscle) return []
            const muscleFields = Object.keys(muscle)
            return muscleFields.filter((field:string) => !isObject(muscle[field]))
        },
        setSelect({
            exercicioFields, 
            muscleFields
        }:PrismaExercisesQueryOptions): any //Prisma.exerciciosSelect
        {
            let select = {} as Prisma.exerciciosSelect
            if(exercicioFields){
                select = exercicioFields.reduce((acc: Prisma.exerciciosSelect, curr:string) => {
                    acc[curr as keyof Prisma.exerciciosSelect] = true
                    return acc
                }, {})
            }

            if(muscleFields)
            {
                let musclesSelect = {
                    select: {} as Prisma.exercise_muscleSelect
                } as Prisma.exercicios$musclesArgs

                let muscle = {} as Prisma.musclesArgs
                
                muscleFields.forEach( field => {
                    if(field === 'role' && musclesSelect.select) {
                      return musclesSelect.select.role = true
                    } 
                    if(typeof musclesSelect.select?.muscle === 'boolean'){
                        throw new Error('Erro de tipagem do typescript que não identificou tipo Prisma.musclesArgs')
                    } else {
                        if(!muscle.select) muscle.select = {} as Prisma.musclesSelect
                        muscle.select[field as keyof Prisma.musclesSelect] = true
                    }                
                })
                if(muscle.select) {
                    musclesSelect.select = {
                        ...musclesSelect.select,
                        muscle
                    }
                }
                select.muscles = musclesSelect
            }
            
            return select
        },
        setWhere(body:GraphQlObject): Prisma.exerciciosWhereInput
        {
            const exercicio = body?.exercise
            if(!exercicio)
                throw new Error('SetWhere function should not be invoked without exercise in requestBody body');
            

            const isParam = (item:any) => typeof item === 'string';
            const where = { } as Prisma.exerciciosWhereInput
            for(const key in exercicio)
            {
                if(!isParam(exercicio[key])) continue;
                where[key as keyof Prisma.exerciciosWhereInput] = key === 'id' ? Number(exercicio[key]) : exercicio[key]
            }
           
            return where
        },
        toGraphQlExercise(exercicio:TExercicio) {
            exercicio.muscles = exercicio.muscles.map(({role, muscle}:any) => {
                return {role, ...muscle}
            })

            return exercicio;
        }
    }
}

export default PrismaMapper;