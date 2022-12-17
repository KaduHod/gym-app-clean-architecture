import { PK, Repository } from "../../../App/Repositories/Repository";
import { User } from "../../../Domain/Entities/Entities";

export default 
    class MysqlUserRepository 
    implements Repository<User>
{
    constructor(
        public conn: any
    ){
        this.conn = conn
    }

    async findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async findBy(attrs: Partial<User>): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async findByPK(pk: PK): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async save(t: User): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async delete(pk: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}