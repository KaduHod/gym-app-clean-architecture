import { AlunoRepository, PK } from "../../../App/Repositories/Repository";
import Aluno from "../../../Domain/Entities/Aluno";
import { TAluno } from "../../../Domain/Entities/Entities";
import PrismaRepository from "./PrismaRepository";
import {client} from './client'
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
    hirePersonal(personalId: PK, alunoId: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
    findAll(options?: Prisma.alunosFindManyArgs): Promise<alunos[]> {
        return options ? this.conn.alunos.findMany(options) : this.conn.alunos.findMany();
    }

    async builder(options:any): Promise<any>
    {

    }
    findBy(first:boolean, options:Prisma.alunosFindManyArgs | Prisma.alunosFindUniqueArgs): Promise<Aluno[]> 
    {
        throw new Error("Method not implemented.");
    }
    findByPK(pk: PK, fields?: string[] | undefined): Promise<Aluno> {
        throw new Error("Method not implemented.");
    }
    save(t: Aluno | Aluno[]): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(pk: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }
    exists(pk: PK): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}