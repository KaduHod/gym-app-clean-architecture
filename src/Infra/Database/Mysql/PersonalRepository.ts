import { PersonalRepository, PK, Repository } from "../../../App/Repositories/Repository";
import { TPersonal } from "../../../Domain/Entities/Entities";
import Personal from "../../../Domain/Entities/Personal";
import MysqlRepository from "./MysqlRepository";


export default 
    class MysqlPersonalRepository 
    extends MysqlRepository<Personal, TPersonal>
    implements PersonalRepository
{
    constructor()
    {
        super('personais')
    }
    async findAllWithUser(fields?: string[] | undefined): Promise<Personal[]> {
        if(fields){
            
        }
    }
    async findByWithUser(attrs: Partial<TPersonal>, first: boolean = false, fields?: string[] | undefined): Promise<Personal[]> {
        if(fields){

        }
    }
    async findByPKWithUser(pk: PK, fields?: string[] | undefined): Promise<Personal> {
        if(fields){

        }
    }  
}