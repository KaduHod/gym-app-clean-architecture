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
                select.alunos = this.setAlunosSelect(body) as Prisma.users$alunosArgs
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
    setAlunosSelect(body:GraphQlObject): Prisma.users$alunosArgs
    {
        const {alunos} = body.personais ?? body.personal
        const select = {} as Prisma.usersSelect;

        for(const field in alunos)
        {
            select[field as keyof Prisma.usersSelect] = true
        }
        return {
            select: {
                aluno: {
                    select
                } as Prisma.usersArgs
            } as Prisma.personal_alunoSelect
        } as Prisma.users$alunosArgs
    },
    toArrayGraphQL(personais:any[]): any[]
    {
        return personais.map(({alunos, ...personal}) => {
            return {...personal, alunos:alunos.map(({aluno}:any) => aluno)  }
        })
    }
}