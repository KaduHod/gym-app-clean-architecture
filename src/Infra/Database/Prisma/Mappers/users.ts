import { Prisma, users } from "@prisma/client";
import { writeFile } from "fs/promises";
import User from "../../../../Domain/Entities/User";
import { isObject } from "../../../../Helpers/Objects";
import { GraphQlObject } from "../../../Web/resolvers";
import { isParam } from "./prisma";

/**
 * User Mapper for GraphQlToPrisma
 */
export default {
    getFields(body:GraphQlObject): string[]
    {
        const users = body.user ?? body.users ?? body.alunos ?? body.aluno ?? body.personal ?? body.personais
        const userFields = Object.keys(users)
        return userFields.filter( (field:string) => !isObject(users[field]));
    },
    setWhere(body:GraphQlObject): Prisma.usersWhereInput
    {
        const user = body.users ?? body.user
        let where = {} as Prisma.usersWhereInput
        for(const key in user) 
        {
            if(!isParam(user[key])) continue;
            if(key === 'permission')
            {
                where.users_permissions = this.setPermissionsWhereArgs(body);
                continue;
            }
            where[key as keyof Prisma.usersWhereInput] =  key === 'id' ? Number(user[key]) : user[key];
        }
        return where;
    },
    setPermissionsWhereArgs(body: GraphQlObject): Prisma.Users_permissionsListRelationFilter
    {
        return {
            some: {
                permission : {
                    title : body.users.permission ?? body.user.permission as Prisma.StringFilter
                } as Prisma.permissionsWhereInput
            } as Prisma.users_permissionsWhereInput
        } as Prisma.Users_permissionsListRelationFilter
    },
    setPermissionsSelectArgs(body:GraphQlObject): Prisma.users$users_permissionsArgs
    {
        const permissions =  body.user?.permissions ?? body.users?.permissions ?? body.alunos?.permissions ?? body.aluno?.permissions ?? body.personal?.permissions ?? body.personais?.permissions;

        const select = {
            select : {} as Prisma.users_permissionsSelect 
        } as Prisma.users$users_permissionsArgs
        
        if(permissions && Object.keys(permissions).length) 
        {
            const innerSelect = {} as Prisma.permissionsSelect;

            for (const field in permissions)
            {                    
                innerSelect[field as keyof Prisma.permissionsSelect] = true;
            }

            if(!select.select) throw new Error('Typescript bug in select field for permission line 66 src/infra/database/prisma/mappers/users.ts')

            select.select = {
                permission :{
                    select : innerSelect as Prisma.permissionsSelect
                } as Prisma.permissionsArgs
            }            
        }     
        
        return select
    },
    setSelect(body:GraphQlObject): Prisma.usersSelect
    {
        const entity = body.user ?? body.users ?? body.alunos ?? body.aluno ?? body.personal ?? body.personais;
        const select = {} as Prisma.usersSelect

        
        for (const key in entity)
        {
            if(key === 'permission' ) continue;
            if(key === 'permissions') {
                select.users_permissions = this.setPermissionsSelectArgs(body);
                continue
            }
            select[key as keyof Prisma.usersSelect] = true
        }

        return select
    },
    async toArrayGraphQL(users:any[])
    {
        return users.map(({users_permissions,...user}) => {
            user.permissions = users_permissions.map(({permission}: any) => {
                return {...permission}
            })
            return user
        })
    }
}