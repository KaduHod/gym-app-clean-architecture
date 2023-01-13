import { PK, Repository } from "../../../App/Repositories/Repository";
import { TAluno } from "../../../Domain/Entities/Entities";
import Aluno from "../../../Domain/Entities/Aluno";
import MysqlRepository from "./KnexRepository";

export default 
    class MysqlAlunoRepository 
    extends MysqlRepository<Aluno, TAluno>
{
    constructor()
    {
        super('alunos')
    }

    public async hirePersonal(alunoId:PK ,personalId:PK)
    {
        return await this
                        .conn(this.tableName)
                        .where({
                            id:alunoId
                        })
                        .update('personal_id', personalId)
    }

    public async getAlunowithoutPersonal (): Promise<number>
    {
        return (await this
                        .conn('alunos')
                        .select('id')
                        .whereNull('personal_id')
                        .limit(1)
                        .first()).id
    }
}