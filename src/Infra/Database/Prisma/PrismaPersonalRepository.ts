import { 
    optionsFindAllPersonalWithUsers, 
    optionsFindByPersonalWithUsers, 
    optionsFindByPkPersonalWithUsers, 
    PersonalRepository, 
    PK, 
    Repository 
} from "../../../App/Repositories/Repository";
import Personal from "../../../Domain/Entities/Personal";
import PrismaRepository from "./PrismaRepository";
import { Prisma } from "@prisma/client";

export default 
    class PrismaPersonalRepository
    extends PrismaRepository
    implements PersonalRepository
{
    public tableName: string;
    constructor()
    {
        super()
        this.tableName = 'personais';
    }
    findAllWithUser(options: optionsFindAllPersonalWithUsers): Promise<Personal[]> {
        throw new Error("Method not implemented.");
    }
    findByWithUser(options: optionsFindByPersonalWithUsers): Promise<Personal[]> {
        throw new Error("Method not implemented.");
    }
    findByPKWithUser(options: optionsFindByPkPersonalWithUsers): Promise<Personal> {
        throw new Error("Method not implemented.");
    }
    findAll(options?: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    findBy(options: any, first?: boolean): Promise<any> {
        throw new Error("Method not implemented.");
    }
    findByPK(pk: PK): Promise<Personal | null> {
        return this
                .conn 
                .personais 
                .findUnique({where:{id:pk}})
    }
    async save(options: Prisma.personaisUncheckedCreateInput): Promise<Personal> {
        return await this
                        .conn 
                        .personais 
                        .create({data:options})
    }
    delete(pk: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async exists(pk: number): Promise<boolean> {
        return !! (await this
                            .conn
                            .personais
                            .findUnique({
                                where:{id:pk}, 
                                select:{id:true}
                            }))
    }
    
}
