import { Prisma } from "@prisma/client";
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
    setWhere(body:GraphQlObject) 
    {
        const user = body.users ?? body.user
        let where = {} as Prisma.usersWhereInput
        for(const key in user) 
        {
            if(!isParam(user[key])) continue;
            where[key as keyof Prisma.usersWhereInput] =  key === 'id' ? Number(user[key]) : user[key];
        }
        return where;
    },
    setPermissionsArgs(body:GraphQlObject): Prisma.users$users_permissionsArgs
    {
        const permissions = body.user?.permissions ?? body.users?.permissions ?? body.alunos?.permissions ?? body.aluno?.permissions ?? body.personal?.permissions ?? body.personais?.permissions
        const permissionsSelect = {} as Prisma.permissionsSelect;
        for (const field in permissions)
        {
            permissionsSelect[field as keyof Prisma.permissionsSelect] = true;
        }
        return {
            select : {
                permission : {
                    select: permissionsSelect
                } as Prisma.permissionsArgs
            } as Prisma.users_permissionsSelect 
        } as Prisma.users$users_permissionsArgs
    },
    setSelect(body:GraphQlObject): Prisma.usersSelect
    {
        const entity = body.user ?? body.users ?? body.alunos ?? body.aluno ?? body.personal ?? body.personais
        const select = {} as Prisma.usersSelect

        
        for (const key in entity)
        {
            if(key === 'permissions' ) continue;
            if(key === 'permission') {
                select.users_permissions = this.setPermissionsArgs(body);
                continue
            }
            select[key as keyof Prisma.usersSelect] = true
        }

        return select
    }
}