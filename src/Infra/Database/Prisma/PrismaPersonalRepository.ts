import { PersonalRepository, PK } from "../../../App/Repositories/Repository";
import Personal from "../../../Domain/Entities/Personal";
import PrismaRepository from "./PrismaRepository";
import { Prisma } from "@prisma/client";

export default 
    class PrismaPersonalRepository
    extends PrismaRepository
    implements PersonalRepository
{
    public tableName: string;
    public personalPermissionRelationWhere = {
        some : {
            permission_id : {
                equals : 2
            } as Prisma.IntFilter
        } as Prisma.users_permissionsWhereInput
    } as Prisma.Users_permissionsListRelationFilter

    constructor()
    {
        super()
        this.tableName = 'users';
    }
    
    async findAll(options?: Prisma.usersFindManyArgs): Promise<Personal[] | null> {
        if(options)
        {
            if(!options.where) options.where = {} as Prisma.usersWhereInput
            options.where.users_permissions = this.personalPermissionRelationWhere;
            return await this
                            .conn
                            .users
                            .findMany(options) as Personal[]
        }                 
        return await this
                        .conn
                        .users
                        .findMany({
                            where: {
                                users_permissions: this.personalPermissionRelationWhere
                            } as Prisma.usersWhereInput
                        } as Prisma.usersFindManyArgs ) as Personal[]
    }
    async findBy(
        options: Prisma.usersFindFirstArgsBase | Prisma.usersFindManyArgs, 
        first?: boolean
    ): Promise<Personal | Personal[] | null> {
        
        if(!options.where) options.where = {} as Prisma.usersWhereInput
        options.where.users_permissions = this.personalPermissionRelationWhere;

        if(first)
        {
            return await this
                            .conn
                            .users
                            .findFirst(options as Prisma.usersFindFirstArgsBase) as Personal
        }
        
        return await this
                        .conn
                        .users
                        .findMany(options as Prisma.usersFindManyArgs) as Personal[]
    }

    async findByPK(pk: PK): Promise<Personal | null> {
        return await this
                        .conn 
                        .users 
                        .findFirst({
                            where:{
                                id:pk,
                                users_permissions : {
                                    some : {
                                        permission_id : 2
                                    }
                                } as Prisma.Users_permissionsListRelationFilter
                            } as Prisma.usersWhereInput
                        } as Prisma.usersFindFirstArgsBase) as Personal
    }

    async save(options: Prisma.usersCreateInput): Promise<Personal> {
        options.users_permissions = {
            create : {
                permission_id:2
            } as Prisma.users_permissionsUncheckedCreateWithoutUserInput
        }

        return await this
                        .conn 
                        .users 
                        .create({
                            select: {
                                id:true,
                                users_permissions : {
                                    select : {
                                        permission_id: true,
                                        permission: {
                                            select : {
                                                title:true
                                            }
                                        } as Prisma.permissionsArgs
                                    } as Prisma.users_permissionsSelect
                                } as Prisma.users$users_permissionsArgs
                            } as Prisma.usersSelect,
                            data:options
                        }) as Personal
    }

    async delete(pk: number): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async exists(pk: number): Promise<boolean> {
        return !! (await this
                            .conn
                            .users
                            .findFirst({
                                where:{
                                    id:pk,
                                    users_permissions : {
                                        some : {
                                            permission_id : 2
                                        }
                                    } as Prisma.Users_permissionsListRelationFilter
                                } as Prisma.usersWhereInput
                            } as Prisma.usersFindFirstArgsBase))
    }
    
}
