import { AlunoRepository, PK } from "../../../App/Repositories/Repository";
import Aluno from "../../../Domain/Entities/Aluno";
import { TAluno } from "../../../Domain/Entities/Entities";
import PrismaRepository from "./PrismaRepository";
import {client} from './client'

export default 
    class PrismaAlunoRepository
    extends PrismaRepository
    implements AlunoRepository
{
    public conn: any;
    public tableName: any;
    constructor()
    {
        super()
        this.conn = client
        this.tableName = 'alunos'
        
    }
    hirePersonal(personalId: PK, alunoId: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
    async findAll(fields?: string[] | undefined): Promise<Aluno[]> {
        if(fields)
        {
            return await this
                            .conn
                            .alunos
                            .findMany({
                                select:this.setFields(fields)
                            }); 
        }
        return await this
                        .conn
                        .alunos
                        .findMany();
    }
    findBy(attrs: Partial<TAluno>, first?: boolean, fields?: string[] | undefined): Promise<Aluno[]> {
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