import { Entity } from "../../Domain/Entities/Entities"

export type PK = number | string

export interface Repository<T extends Entity> {
    public conn:any
    async findAll():Promise<T[]>
    async findBy(attrs:Partial<T>):Promise<T[]>
    async findByPK(pk:PK):Promise<T | null>
    async save(t:T):Promise<any>
    async delete(pk:PK):Promise<any>
}