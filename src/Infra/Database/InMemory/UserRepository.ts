import { readFile, writeFile } from "fs/promises";
import { PK, Repository } from "../../../App/Repositories/Repository";
import { TUser } from "../../../Domain/Entities/Entities";
import User from "../../../Domain/Entities/User";


export default 
    class InMemoryUserRepository 
    implements Repository<User, TUser>
{
    public path:string
    constructor(){
        this.path = 'src/Infra/Database/InMemory/Data/Users.json'
    }
    public async findWhere(conditions: Function): Promise<User[] | null> {
        return (await this.findAll()).filter(user => conditions(user));
    }
    public async findAll(): Promise<User[]> {
        console.log('Auqi')
        const file = await readFile(this.path, 'utf8')        
        return JSON.parse(file)
    }   
    findBy(attrs: Partial<TUser>): Promise<TUser[]> {
        throw new Error("Method not implemented.");
    }
    findByPK(pk: PK): Promise<TUser | null> {
        throw new Error("Method not implemented.");
    }
    public async save(data: User | User[]): Promise<any> {
        let users = await this.findAll();
        if(Array.isArray(data)){
            users = [...users, ...data]
        } else {
            users.push(data)
        }
        await writeFile(this.path, JSON.stringify(users));
    }
    delete(pk: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }
}