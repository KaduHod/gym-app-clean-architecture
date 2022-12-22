import { PK, Repository } from "../../../App/Repositories/Repository";
import User from "../../../Domain/Entities/User";
import { TUser } from "../../../Domain/Entities/Entities";
import {getConn} from './conn'
import { Knex } from "knex";
export default 
    class MysqlUserRepository 
    implements Repository<User, TUser>
{
    public conn: Knex
    constructor()
    {
        this.conn = getConn()
    }

    async findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async findBy(attrs: Partial<TUser>): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async findByPK(pk: PK): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async save(t: User): Promise<any> {
        return await this.conn('users').insert(t, 'id')
    }
    async delete(pk: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}