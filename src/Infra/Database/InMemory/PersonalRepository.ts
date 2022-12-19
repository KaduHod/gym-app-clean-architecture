import { PK, Repository } from "../../../App/Repositories/Repository";
import { TPersonal } from "../../../Domain/Entities/Entities";
import { readFile, writeFile } from 'fs/promises';
import Personal from "../../../Domain/Entities/Personal";


export default  
    class InMemoryPersonalRepository
    implements Repository<Personal, TPersonal>
{
    public path:string
    constructor(){
        this.path = 'src/Infra/Database/InMemory/Data/Personais.json'
    }
    
    public async findAll(): Promise<Personal[]> {
        return JSON.parse((await readFile(this.path, 'utf8')))
    }
    public async findBy(attrs: Partial<TPersonal>): Promise<Personal[]> {
        throw new Error("Method not implemented.");
    }
    public async findByPK(pk: PK): Promise<Personal | null> {
        throw new Error("Method not implemented.");
    }
    public async save(data: Personal | Personal[]): Promise<any> {
        let personais = await this.findAll()
        if(Array.isArray(data)){
            personais = [...personais, ...data]
        }else {
            personais.push(data)
        }
        await writeFile(this.path, JSON.stringify(data))
    }
    public async delete(pk: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}