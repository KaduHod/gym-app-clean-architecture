import { Prisma } from "@prisma/client";
import { writeFile } from "fs";
import { PK } from "../../../../App/Repositories/Repository";
import Personal from "../../../../Domain/Entities/Personal";
import { GraphQlObject } from "../../../Web/resolvers";
import { isParam } from "./prisma";

export default {
    getPersonalFromBody(body:GraphQlObject)
    {
        return body.personais ?? body.personal;
    },
    setSelect(body:GraphQlObject): Prisma.usersSelect
    {
        const personal = this.getPersonalFromBody(body);
        const select = {} as Prisma.usersSelect;
        for(const field in personal)
        {
            if(field === 'alunos') {
                
                continue;
            }
            select[field as keyof Prisma.usersSelect] = true;
            
        }
        return select;
    },
    setWhere(body:GraphQlObject): Prisma.usersWhereInput
    {
        const personal = this.getPersonalFromBody(body);
        const where = {} as Prisma.usersWhereInput;

        for(const field in personal)
        {
            if(!isParam(personal[field])) continue;
            
            where[field as keyof Prisma.usersWhereInput] = field === 'id' ? Number(personal[field]) : personal[field]
        }

        return where;
    },
    setAlunosWhere(body:GraphQlObject): Prisma.Personal_alunoListRelationFilter
    {
        const where = {
            some: {
                personal_id: {}
            } as Prisma.personal_alunoWhereInput
        } as Prisma.Personal_alunoListRelationFilter
        return {}
    },
    toArrayGraphQL(personais:any[]): any[]
    {
        writeFile('personais.json', JSON.stringify(personais), (err:any) => {
            if(err) throw new Error(err)
        })
        // console.log(personais)
        return []
    },
    PersonaisWithAlunosToGRaphQL(personais:any, alunos:any)
    {
        
    }
}