import { Knex } from "knex";
import { PK, Repository } from "../../../App/Repositories/Repository";
import { Entity } from "../../../Domain/Entities/Entities";
import { MysqlDB, getConn } from "./conn";

export default abstract class 
    MysqlRepository<T extends Entity, TT>
    implements Repository<T, TT>
{
    public conn: Knex | any
    constructor(
        public tableName:string
    )
    {
        this.conn = getConn()
        this.tableName = tableName
    }

    async findAll(): Promise<T[]> {
        return await this
                        .conn(this.tableName)
    }

    async findBy(attrs: Partial<TT>, first?:boolean): Promise<T[]> {
        if(first){
            return await this
                            .conn(this.tableName)
                            .where(attrs) 
                            .first()
        }
        return await this
                        .conn(this.tableName)
                        .where(attrs)
    }

    async findByPK(pk: PK): Promise<T> {
        const result = await this
                                .conn(this.tableName)
                                .where({id:pk})
                                .first()
        if(!result){
            throw new Error('Record not found!')
        }

        return result
    }

    async save(t: T | T[]): Promise<any> {
        return await this
                        .conn(this.tableName)
                        .insert(t)
    }

    async delete(pk: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async exists(pk:PK): Promise<boolean>
    {
        return !!(await this
                            .conn(this.tableName)
                            .select('id')
                            .where({id:pk})
                            .limit(1)
                            .first())
    }
    
}