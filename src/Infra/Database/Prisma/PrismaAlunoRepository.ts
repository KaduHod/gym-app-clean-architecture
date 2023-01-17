import { AlunoRepository, PK } from "../../../App/Repositories/Repository";
import Aluno from "../../../Domain/Entities/Aluno";
import PrismaRepository from "./PrismaRepository";
import { alunos, Prisma } from "@prisma/client";

export default 
    class PrismaAlunoRepository
    extends PrismaRepository
    implements AlunoRepository
{
    public tableName: any;
    constructor()
    {
        super()
        this.tableName = 'alunos'
        
    }
    async hirePersonal(personalId: PK, alunoId: PK): Promise<any> {
        return await this
                        .conn 
                        .alunos
                        .update({
                            where :{id:alunoId},
                            data: {personal_id: personalId}
                        })
    }
    
    findAll(options?: Prisma.alunosFindManyArgs): Promise<alunos[]> {
        return options ? this.conn.alunos.findMany(options) : this.conn.alunos.findMany();
    }

    async builder(options:any): Promise<any>
    {

    }
    async findBy(
        options:Prisma.alunosFindManyArgs | Prisma.alunosFindUniqueArgs, 
        first:boolean
    ): Promise<Aluno[] | Aluno | null> 
    {
        if(first)
        {
            return await this
                        .conn
                        .alunos
                        .findUnique(options as Prisma.alunosFindUniqueArgs) as Aluno
        }

        return await this
                        .conn
                        .alunos
                        .findMany(options as Prisma.alunosFindManyArgs) as Aluno[]
    }
    async findByPK(pk:PK): Promise<Aluno | null> 
    {
        return await this
                        .conn
                        .alunos
                        .findUnique({where:{id:pk}}) as Aluno;
    }
    async save(options: Prisma.alunosUncheckedCreateInput): Promise<Aluno | null> {
        return await this 
                        .conn 
                        .alunos
                        .create({
                            data: options
                        }) as Aluno;
    }
    delete(pk: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async exists(pk: PK): Promise<boolean> {
        return !!(await this
                            .conn
                            .personais
                            .findUnique({
                                where:{id:pk},
                                select:{id:true}
                            }));
    }

}