import Aluno from "../../Domain/Entities/Aluno"
import { TAluno, TExercicio, TPersonal } from "../../Domain/Entities/Entities"
import Exercise from "../../Domain/Entities/Exercise"
import Personal from "../../Domain/Entities/Personal"

export type PK = number

export interface Repository {
    conn:any
    tableName:any
    async findAll(
        options?:string[] | any
    ):Promise<any[]>

    async findBy( 
        first:boolean = false,
        options?: any
    ):Promise<any[] | any | null>

    async findByPK(
        options?:string[] | any
    ):Promise<any | null>

    async save(
        t:T | T[]
    ):Promise<any>

    async delete(pk:PK):Promise<any>
    
    async exists(pk:PK):Promise<boolean>
}

export interface AlunoRepository extends Repository {
    async hirePersonal(personalId:PK, alunoId:PK): Promise<any>
}

type optionsFindAllPersonalWithUsers = {
    fields?: string[] | null,
    userFields?: string[] | null
}

type optionsFindByPersonalWithUsers = {
    attrs: Partial<TPersonal>,
    fields?: string[] | null,
    userFields?: string[] | null,
    first?: boolean | null
}

type optionsFindByPkPersonalWithUsers = {
    pk:PK,
    fields?: string[] | null,
    userFields?: string[] | null
}
export interface PersonalRepository extends Repository {
    async findAllWithUser(options:optionsFindAllPersonalWithUsers):Promise<Personal[]>
    async findByWithUser(options:optionsFindByPersonalWithUsers):Promise<Personal[]>
    async findByPKWithUser(options:optionsFindByPkPersonalWithUsers):Promise<Personal>
}

export type MusclesFromExerciseOptions = string[]

export interface ExerciseRepository extends Repository {
    async musclesFromExercise(
        exercise_id:PK, 
        fields: MusclesFromExerciseOptions | null,
        roles: TExerciseMuscleRole[] | null
    ): Promise<any>
}