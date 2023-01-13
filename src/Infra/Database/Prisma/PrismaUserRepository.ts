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
        return this
                .conn
                .users
                .findMany(options) as Promise<User[] | User | null> ;
    }

    async findBy(options: Prisma.usersFindManyArgs | Prisma.usersFindUniqueArgs, first?: boolean): Promise<User[] | User | null> {
        if(first) {
            return await this 
                            .conn 
                            .users 
                            .findUnique(options as Prisma.usersFindUniqueArgs) as User;
        }

        return await this 
                        .conn 
                        .users 
                        .findMany(options as Prisma.usersFindManyArgs) as User[];
        
    }

    async findByPK(pk: PK): Promise<User | null> 
    {
        return await this 
                        .conn
                        .users
                        .findUnique({where:{id:pk}}) as User;
    }

    save(user: Prisma.usersCreateInput): Promise<any> {
        return this
                .conn
                .users
                .create({data:user})
    }

    delete(pk: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }

    exists(pk: PK): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
        
}
