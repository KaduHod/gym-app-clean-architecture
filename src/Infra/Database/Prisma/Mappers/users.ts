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
        const users = body.alunos ?? body.aluno ?? body.personal ?? body.personais
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
    setSelect(body:GraphQlObject): Prisma.usersSelect
    {
        const entity = body?.alunos ?? body?.aluno ?? body?.personal ?? body?.personais
        return {}
    }
}