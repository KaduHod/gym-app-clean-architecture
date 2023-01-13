import { 
    optionsFindAllPersonalWithUsers, 
    optionsFindByPersonalWithUsers, 
    optionsFindByPkPersonalWithUsers, 
    PersonalRepository
} from "../../../App/Repositories/Repository";
import { TPersonal } from "../../../Domain/Entities/Entities";
import Personal from "../../../Domain/Entities/Personal";
import MysqlRepository from "./KnexRepository";



export default 
    class MysqlPersonalRepository 
    extends MysqlRepository<Personal, TPersonal>
    implements PersonalRepository
{
    constructor()
    {
        super('personais')
    }
    async findAllWithUser({
        fields, 
        userFields
    }:optionsFindAllPersonalWithUsers): Promise<Personal[]> 
    {
        let queryBuilder = this.conn(this.tableName);
        if(fields) queryBuilder.select(...this.setPersonalFields(fields));
        if(userFields) queryBuilder.select(...this.setUserFields(userFields));
        queryBuilder.innerJoin('users','users.id','=','personais.user_id')
        return await queryBuilder;
    }


    async findByWithUser({
        attrs, 
        fields, 
        userFields, 
        first
    }:optionsFindByPersonalWithUsers): Promise<Personal[]> 
    {
        let queryBuilder = this.conn(this.tableName);
        if(fields) queryBuilder.select(...this.setPersonalFields(fields));
        if(userFields) queryBuilder.select(...this.setUserFields(userFields));
        if(first) queryBuilder.first();
        queryBuilder.where(attrs)
        queryBuilder.innerJoin('users','users.id','=','personais.user_id')
        return await queryBuilder;
    }


    async findByPKWithUser({
        pk, 
        fields, 
        userFields
    }:optionsFindByPkPersonalWithUsers): Promise<Personal> 
    {
        let queryBuilder = this.conn(this.tableName);
        if(fields) queryBuilder.select(...this.setPersonalFields(fields));
        if(userFields) queryBuilder.select(...this.setUserFields(userFields));
        queryBuilder.findByPK(pk)
        queryBuilder.innerJoin('users','users.id','=','personais.user_id')
        return await queryBuilder;
    }  

    public setPersonalFields(fields:string[])
    {
        return fields.map( field => `personais.${field}`)
    }

    public setUserFields(fields:string[])
    {
        return fields.map( field => `users.${field}`)
    }




}