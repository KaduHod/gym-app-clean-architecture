import { PK, Repository } from "../../../App/Repositories/Repository";
import Aluno from "../../../Domain/Entities/Aluno";
import { TAluno } from "../../../Domain/Entities/Entities";
import { readFile, writeFile } from "fs/promises";

export default
    class InMemoryAlunoRepository
    implements Repository<Aluno, TAluno>
{
    private path:string
    constructor()
    {
        this.path = 'src/Infra/Database/InMemory/Data/Alunos.json'
    }
    public async findAll(): Promise<Aluno[]> {
        return JSON.parse(await readFile(this.path, 'utf8'))
    }
    findBy(attrs: Partial<TAluno>): Promise<Aluno[]> {
        throw new Error("Method not implemented.");
    }
    findByPK(pk: PK): Promise<Aluno | null> {
        throw new Error("Method not implemented.");
    }
    public async save(data: Aluno | Aluno[]): Promise<any> {
        let alunos = await this.findAll()
        if(Array.isArray(data)){
            alunos = [...alunos, ...data]
        } else {
            alunos.push(data)
        }
        await writeFile(this.path, JSON.stringify(alunos))
    }
    delete(pk: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}
