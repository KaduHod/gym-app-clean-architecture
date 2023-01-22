import { Prisma } from "@prisma/client"
import { GraphQlObject } from "../../../Web/resolvers"

export default {
    getExerciseFromBody(body:GraphQlObject)
    {
        return body.exercises ?? body.exercise;
    },
    toArrayGraphQL(exercises:any[] | any)
    {
        if(Array.isArray(exercises)){
            return exercises.map(({muscles, ...exercise}:any) => {
                return {
                    ...exercise, 
                    muscles: muscles.map(({role, muscle}:any) => ({...muscle, role}))
                }
            })
        }
        const {muscles, ...exercise} = exercises
        return {...exercise, muscles: muscles.map(({muscle}:any) => muscle)}
    },
    setSelect(body:GraphQlObject): Prisma.exerciciosSelect
    {
        const exercise = this.getExerciseFromBody(body)
        const select = {} as Prisma.exerciciosSelect
        for(const field in exercise)
        {
            if(field === 'muscle' || field === 'role') continue;
            
            if(field === 'muscles')
            {
                select.muscles = this.setSelectMuscles(body)
                continue;
            }

            select[field as keyof Prisma.exerciciosSelect] = true
        }

        return select
    },
    setSelectMuscles(body:GraphQlObject): Prisma.exercicios$musclesArgs
    {
        const {muscles} = this.getExerciseFromBody(body)
        const musclesSelect = {} as Prisma.musclesSelect
        const exercise_muscleSelect = {} as Prisma.exercise_muscleSelect

        for(const field in muscles)
        {
            if(field === 'role') {
                exercise_muscleSelect.role = true
                continue;
            }
            

            musclesSelect[field as keyof Prisma.musclesSelect] = true
        }

        return {
            select: {
                ...exercise_muscleSelect,
                muscle: {
                    select : musclesSelect
                } as Prisma.musclesArgs
            } as Prisma.exercise_muscleSelect
        } as Prisma.exercicios$musclesArgs
    },
    setWhere(body:GraphQlObject): Prisma.exerciciosWhereInput
    {
        const {id, name, muscle, role} = this.getExerciseFromBody(body)
        const where = {} as Prisma.exerciciosWhereInput;
        console.log({name})
        if(id && typeof id === 'string') where.id = Number(id)
        if(name && typeof name === 'string') where.name = name 
        if(muscle) {
            if(!where.muscles)
            {
                where.muscles = {} as Prisma.Exercise_muscleListRelationFilter
            }
            if(!where.muscles.some)
            {
                where.muscles.some = {} as Prisma.exercise_muscleWhereInput 
            }
            where.muscles.some.muscle = {
                name: muscle
            } as Prisma.musclesWhereInput
        }
        if(role) {
            if(!where.muscles)
            {
                where.muscles = {} as Prisma.Exercise_muscleListRelationFilter
            }
            if(!where.muscles.some)
            {
                where.muscles.some = {} as Prisma.exercise_muscleWhereInput 
            }

            where.muscles.some.role = role
        }
        return where
    }
}