import { PK, Repository } from "../../../App/Repositories/Repository";
import { TUser } from "../../../Domain/Entities/Entities";
import User from "../../../Domain/Entities/User";
import {client} from './client'
import PrismaRepository from "./PrismaRepository";
import { PrismafindManyOptions } from "./querys";

export default 
    class UserPrismaRepository
    extends PrismaRepository
    implements Repository<User, TUser>
{
    public conn: any;
    public tableName: any;

    constructor()
    {
        super()
        this.conn = client
        this.tableName = 'users'
    }
    
    findAll(options?: PrismafindManyOptions): Promise<User[]> {
        return this.conn.users.findMany(options)
    }

    findBy(attrs: Partial<TUser>, first?: boolean, fields?: string[] | undefined): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    findByPK(pk: PK, fields?: string[] | undefined): Promise<User> {
        throw new Error("Method not implemented.");
    }
    save(t: User | User[]): Promise<any> {
        return this.conn.users.create({data:t})
    }
    delete(pk: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }
    exists(pk: PK): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
        
}
