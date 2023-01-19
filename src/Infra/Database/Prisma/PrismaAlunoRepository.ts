import { AlunoRepository, PK } from "../../../App/Repositories/Repository";
import Aluno from "../../../Domain/Entities/Aluno";
import PrismaRepository from "./PrismaRepository";
import { Prisma } from '@prisma/client'

export default 
    class PrismaAlunoRepository
    extends PrismaRepository
    implements AlunoRepository
{
    public tableName: any;

    public alunoPermissionRelationWhere = {
        some : {
            permission_id : {
                equals : 1
            } as Prisma.IntFilter
        } as Prisma.users_permissionsWhereInput
    } as Prisma.Users_permissionsListRelationFilter

    constructor()
    {
        super()
        this.tableName = 'users'
        
    }
    
    async hirePersonal(personalId: PK, alunoId: PK): Promise<any> {
        return await this
                        .conn 
                        .personal_aluno
                        .create({
                            data: {
                                personal_id: personalId,
                                aluno_id: alunoId
                            }
                        } as Prisma.personal_alunoCreateArgs)
    }
    
    async findAll(options?: Prisma.usersFindManyArgs): Promise<Aluno[]> {
        if(options){
            if(!options.where) options.where = {} as Prisma.usersWhereInput
            options.where.users_permissions = this.alunoPermissionRelationWhere

            return await this
                        .conn
                        .users
                        .findMany(options as Prisma.usersFindManyArgs) as Aluno[]
        }

        return await this
                        .conn
                        .users
                        .findMany({ 
                            where : {
                                users_permissions : this.alunoPermissionRelationWhere
                            } as Prisma.usersWhereInput
                        } as Prisma.usersFindManyArgs) as Aluno[]
        
    }

    async findBy(
        options:Prisma.usersFindManyArgs | Prisma.usersFindFirstArgs, 
        first:boolean
    ): Promise<Aluno[] | Aluno | null> 
    {
        if(!options.where) options.where = {} as Prisma.usersWhereInput
        options.where.users_permissions = this.alunoPermissionRelationWhere

        if(first)
        {
            return await this
                        .conn
                        .users
                        .findFirst(options as Prisma.usersFindFirstArgs) as Aluno
        }

        return await this
                        .conn
                        .users
                        .findMany(options as Prisma.usersFindManyArgs) as Aluno[]
    }

    async findByPK(pk:PK): Promise<Aluno | null> 
    {
        return await this
                        .conn
                        .users
                        .findUnique({where:{id:pk}}) as Aluno;
    }

    async save(options: Prisma.usersCreateInput): Promise<Aluno | null> {
        options.users_permissions = {
            create : {
                permission_id:1
            } as Prisma.users_permissionsUncheckedCreateWithoutUserInput
        }

        return await this 
                        .conn 
                        .users
                        .create({
                            select:{
                                id:true,
                                users_permissions : {
                                    select : {
                                        permission_id: true
                                    } as Prisma.users_permissionsSelect
                                } as Prisma.users$users_permissionsArgs
                            } as Prisma.usersSelect,
                            data: options
                        } as Prisma.usersCreateArgs) as Aluno;
    }
    delete(pk: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async hasPersonal(alunoId:PK): Promise<boolean>
    {
        return !!(await this
                        .conn
                        .personal_aluno
                        .findFirst({
                            select: {
                                id:true
                            },
                            where : {
                                aluno_id : alunoId
                            } as Prisma.personal_alunoWhereInput
                        } as Prisma.personal_alunoFindFirstArgs))
    }

    async exists(pk: PK): Promise<boolean> {
        return !!(await this
                            .conn
                            .users
                            .findUnique({
                                where:{id:pk},
                                select:{id:true}
                            }));
    }

}