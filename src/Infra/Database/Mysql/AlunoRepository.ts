import { PK, Repository } from "../../../App/Repositories/Repository";
import { TAluno } from "../../../Domain/Entities/Entities";
import Aluno from "../../../Domain/Entities/Aluno";

export default 
    class MysqlAlunoRepository 
    implements Repository<Aluno, TAluno>
{
    constructor(public conn:any)
    {
        this.conn = conn
    }
    async findAll(): Promise<Aluno[]> {
        throw new Error("Method not implemented.");
    }
    async findBy(attrs: Partial<TAluno>): Promise<Aluno[]> {
        throw new Error("Method not implemented.");
    }
    async findByPK(pk: PK): Promise<Aluno | null> {
        throw new Error("Method not implemented.");
    }
    async save(t: Aluno): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async delete(pk: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}