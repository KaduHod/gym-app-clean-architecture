import { optionsFindAllPersonalWithUsers, optionsFindByPersonalWithUsers, optionsFindByPkPersonalWithUsers, PersonalRepository, PK, Repository } from "../../../App/Repositories/Repository";
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
    async findAllWithUser({fields, userFields}:optionsFindAllPersonalWithUsers): Promise<Personal[]> 
    {
        if (userFields && fields) 
        {            
            return await this
                            .conn(this.tableName)
                            .select(
                                ...this.setPersonalFields(fields),
                                ...this.setUserFields(userFields)
                                )
                            .innerJoin('users','users.id','=','personais.user_id')
        }
        if(fields){            
            return await this
                            .conn(this.tableName)
                            .select(...this.setPersonalFields(fields))
                            .innerJoin('users','users.id','=','personais.user_id')
        }

        if(userFields)
        {            
            return await this
                            .conn(this.tableName)
                            .select(...this.setUserFields(userFields))
                            .innerJoin('users','users.id','=','personais.user_id')
        }
        return await this
                        .conn(this.tableName)
                        .innerJoin('users','users.id','=','personais.user_id')
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
        // if(fields && userFields)
        // {
            // return await this
                            // .conn(this.tableName)
                            // .select(
                                // ...this.setPersonalFields(fields), 
                                // ...this.setUserFields(userFields)
                                // )
                            // .innerJoin('users','users.id','=','personais.user_id')
        // }
        // if(fields)
        // {
            // return await this
                            // .conn(this.tableName)
                            // .select(...this.setPersonalFields(fields))
        // }
        // if(userFields)
        // {
            // return await this
                            // .conn(this.tableName)
                            // .select(...this.setUserFields(userFields))
        // }
        // return await this
                        // .conn(this.tableName)
    }


    async findByPKWithUser({
        pk, 
        fields, 
        userFields
    }:optionsFindByPkPersonalWithUsers): Promise<Personal> 
    {
        return this.conn(this.tableName).findByPK(pk)
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