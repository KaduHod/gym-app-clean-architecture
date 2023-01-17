import { GraphQlJson } from '../../../Resolvers/mappers/graphQl'
import { isObject } from '../../../../Helpers/Objects'
import { Prisma, exercicios } from '@prisma/client'
import { GraphQlObject } from '../../../Web/resolvers'
import { 
    PrismaAlunoQueryOptions, 
    PrismaExercisesQueryOptions, 
    PrismaPersonalQueryOptions, 
    PrismaUserQueryOptions 
} from '../querys'
import { Exercicio, TExercicio, TMuscle } from '../../../../Domain/Entities/Entities'
import { ExerciseFactory } from '../../../../Domain/Factory/ExerciseFactory'
import PrismaExercicioRepository from '../PrismaExercicioRepository'
import Muscle from '../../../../Domain/Entities/Muscle'

const isParam = (item:any) => typeof item === 'string';

const PrismaMapper = {
    user: {
        getFields(body:GraphQlObject): string[]
        {
            const users = body.users ?? body.user
            const userFields = Object.keys(users)
            return userFields.filter( (field:string) => !isObject(users[field]));
        },
        setSelect(options:PrismaUserQueryOptions): Prisma.usersSelect
        {
            return options.userFields.reduce((acc:Prisma.usersSelect, curr:any) => {
                acc[curr as keyof Prisma.usersSelect] = true
                return acc
            },{})
        },
        setWhere(body:GraphQlObject)
        {
            const user = body.users ?? body.user
            let where = {} as Prisma.usersWhereInput
            for(const key in user) 
            {
                if(!isParam(user[key])) continue;
                where[key as keyof Prisma.usersWhereInput] =  key === 'id' ? Number(user[key]) : user[key];
            }
            return where;
        }
    },
    aluno: {
        getUserFields(body:GraphQlObject): string[]
        {
            const user = body.alunos?.user ?? body.alunos?.users ?? body.aluno?.user ?? body.aluno?.users
            if(!user) return [];
            const userFields = Object.keys(user)
            return userFields.filter( (field:string) => !isObject(user[field]));
        },
        
        getFields(body:GraphQlObject): string[]
        {
            const aluno = body.alunos ?? body.aluno 
            const alunoFields = Object.keys(aluno)
            return alunoFields.filter((field:string) => !isObject(aluno[field]));
        },
        setSelect({
            userFields, 
            alunoFields
        }:PrismaAlunoQueryOptions): Prisma.alunosSelect
        {
            let select: Prisma.alunosSelect = {}
            
            if(alunoFields)
            {
                select = alunoFields.reduce((acc:Prisma.alunosSelect, curr:string) => {
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
                select.user = usersArgs
            }

            return select
        },
        setWhere(body:GraphQlObject): Prisma.alunosWhereInput
        {
            const user = body.alunos ?? body.aluno 
            let where = {} as Prisma.alunosWhereInput
            for(const key in user) 
            {
                if(!isParam(user[key])) continue;
                where[key as keyof Prisma.alunosWhereInput] =  key === 'id' ? Number(user[key]) : user[key];
            }
            return where;
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
    },
    personal: {
        getFields(body:GraphQlObject)
        {
            const personal = body?.personais ?? body?.personal
            if(!personal) return []

            return Object
                        .keys(personal)
                        .filter((field:any) => !isObject(personal[field]))

        },
        getUserFields(body:GraphQlObject)
        {
            const user = body.personais?.user ?? body.personais?.users ?? body.personal?.user ?? body.personal?.users
            if(!user) return [];
            const userFields = Object.keys(user)
            return userFields.filter( (field:string) => !isObject(user[field]));
        },
        getAlunoFields(body:GraphQlObject)
        {
            const alunos = body.personais?.alunos ?? body.personais?.aluno ?? body.personal?.aluno ?? body.personal?.alunos
            if(!alunos) return []
            const alunosFields = Object.keys(alunos)
            return alunosFields.filter((field:string) => !isObject(alunos[field]))
        },
        getAlunoUserFields(body:GraphQlObject)
        {
            const user = body.personais?.alunos.user ?? body.personais?.aluno.user ?? body.personal?.alunos.user ?? body.personal?.aluno.user 
            if(!user) return []
            const userFields = Object.keys(user)
            return userFields.filter((field:string) => !isObject(user[field]))
        },
        setSelect({
            personalFields,
            userFields,
            alunosFields,
            alunosUserFields
        }:PrismaPersonalQueryOptions) : Prisma.personaisSelect
        {
            const select = {} as Prisma.personaisSelect
            if(personalFields && personalFields.length)
            {
                personalFields.forEach((field:string) => select[field as keyof Prisma.personaisSelect] = true)
            }

            if(userFields && userFields.length)
            {
                let user = {
                    select: {} as Prisma.usersSelect
                } as Prisma.usersArgs
                if(typeof user.select === 'boolean'){
                    throw new Error('Erro de tipagem do typescript que não identificou tipo Prisma.usersSelect')
                }
                
                if(!user.select) user.select = {} as Prisma.usersSelect
                userFields.forEach((field:string) => {
                    if(!field || !user || !user.select) return;
                    user.select[field as keyof Prisma.usersSelect] = true
                })    

                select.user = user;       
            }

            if(alunosFields &&  alunosFields.length)
            {
                let alunos = {
                    select: {} as Prisma.alunosSelect
                } as Prisma.alunosArgs
                if(typeof alunos.select === 'boolean'){
                    throw new Error('Erro de tipagem do typescript que não identificou tipo Prisma.alunosSelect')
                }

                if(!alunos.select) alunos.select = {} as Prisma.alunosSelect
                alunosFields.forEach((field:string) => {
                    if(!field || !alunos || !alunos.select) return;
                    alunos.select[field as keyof Prisma.alunosSelect] = true
                })   

                if(alunosUserFields && alunosUserFields.length) 
                {
                    let user = {} as Prisma.usersArgs
                    if(alunos.select){
                        alunosUserFields.forEach(field => {
                            if(!user.select) user.select = {} as Prisma.usersSelect
                            user.select[field as keyof Prisma.usersSelect] = true
                        })
                    }

                    alunos.select.user = user
                }

                select.alunos = alunos
            }

           return select
        },
        setWhere(body:GraphQlObject){
            let where = {} as Prisma.personaisWhereInput
            const personal = body.personal ?? body.personais 
            for(const key in personal) 
            {
                if(!isParam(personal[key])) continue;
                where[key as keyof Prisma.personaisWhereInput] =  key === 'id' ? Number(personal[key]) : personal[key];
            }
            return where;
        }
    }
}

export default PrismaMapper;