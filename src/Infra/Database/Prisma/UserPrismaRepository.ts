import { PK, Repository } from "../../../App/Repositories/Repository";
import { TUser } from "../../../Domain/Entities/Entities";
import User from "../../../Domain/Entities/User";
import {client} from './client'
import PrismaRepository from "./PrismaRepository";
import { Prisma } from "@prisma/client";

export default 
    class PrismaUserRepository
    extends PrismaRepository
    implements Repository
{
    
    public tableName: any;

    constructor()
    {
        super()
        this.tableName = 'users'
    }
    
    findAll(options?: Prisma.usersFindManyArgs |  any): Promise<User[] | User | null > {        
        return this.conn.users.findMany(options) as Promise<User[] | User | null> ;
    }

    findBy(first: boolean, options?: Prisma.usersFindManyArgs | Prisma.usersFindUniqueArgs): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    findByPK(pk: PK, fields?: string[] | undefined): Promise<User> {
        throw new Error("Method not implemented.");
    }

    save(options: Prisma.usersCreateArgs): Promise<any> {
        return this.conn.users.create(options)
    }

    delete(pk: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
    exists(pk: PK): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
        
}
