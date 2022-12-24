import Aluno from "../../Domain/Entities/Aluno"
import { Entity, TAluno } from "../../Domain/Entities/Entities"

export type PK = number | string

export interface Repository<T extends Entity, TT> {
    async findAll():Promise<T[]>
    async findBy(attrs:Partial<TT>):Promise<T[]>
    async findByPK(pk:PK):Promise<T | null>
    async save(t:T | T[]):Promise<any>
    async delete(pk:PK):Promise<any>
    async exists(pk:PK):Promise<boolean>
}

export interface AlunoRepository extends Repository<Aluno, TAluno> {
    async hirePersonal(personalId:PK, alunoId:PK): Promise<any>
}