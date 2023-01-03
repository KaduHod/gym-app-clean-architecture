import Aluno from "../../Domain/Entities/Aluno"
import { Entity, TAluno, TExercicio, TPersonal } from "../../Domain/Entities/Entities"
import Exercise from "../../Domain/Entities/Exercise"
import Personal from "../../Domain/Entities/Personal"

export type PK = number | string

export interface Repository<T extends Entity, TT> {
    conn:any
    tableName:any
    async findAll(fields?:string[]):Promise<T[]>
    async findBy(attrs:Partial<TT>, first:boolean = false,fields?:string[]):Promise<T[]>
    async findByPK(pk:PK, fields?:string[]):Promise<T>
    async save(t:T | T[]):Promise<any>
    async delete(pk:PK):Promise<any>
    async exists(pk:PK):Promise<boolean>
}

export interface AlunoRepository extends Repository<Aluno, TAluno> {
    async hirePersonal(personalId:PK, alunoId:PK): Promise<any>
}

export interface PersonalRepository extends Repository<Personal, TPersonal>{
    async findAllWithUser(fields?:string[]):Promise<Personal[]>
    async findByWithUser(attrs:Partial<TPersonal>, first:boolean = false,fields?:string[]):Promise<Personal[]>
    async findByPKWithUser(pk:PK, fields?:string[]):Promise<Personal>
}

export interface ExerciseRepository extends Repository<Exercise, TExercicio> {
    async musclesFromExercise(
        exercise_id:PK, 
        fields: MusclesFromExerciseOptions | null,
        roles: TExerciseMuscleRole[] | null
    ): Promise<any>
}