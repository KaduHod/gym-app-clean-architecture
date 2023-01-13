import { Knex } from "knex";
import { PK, Repository } from "../../../App/Repositories/Repository";
import { Entity } from "../../../Domain/Entities/Entities";
import { MysqlDB, getConn } from "./conn";

export default abstract class 
    KnexRepository<T extends Entity, TT>
    implements Repository
{
    public conn: Knex | any
    constructor(
        public tableName:string
    )
    {
        this.conn = getConn()
        this.tableName = tableName
    }
    builder(options: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async findAll(fields?:string[]): Promise<T[]> {
        if(fields){
            return await this
                            .conn(this.tableName)
                            .select(...fields)
        }
        return await this
                        .conn(this.tableName)
                           
        
    }

    async findBy(first:boolean,options?:{attrs: Partial<TT>, first?:boolean, fields?:string[]}): Promise<T[]> {
        const builder = this.conn(this.tableName);
        if(options?.attrs) builder.where(options.attrs) 
        if(first) builder.first();
        return await builder;
    }

    async findByPK(pk: PK, fields?:string[]): Promise<T> {
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