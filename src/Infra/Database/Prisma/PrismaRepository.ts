import { Prisma } from "@prisma/client";
import { client } from "./client";

type prismaSelectField = {
    [key:string]:boolean
}
export default abstract class PrismaRepository
{
    public conn: Prisma.DefaultPrismaClient;
    constructor()
    {
        this.conn = client
    }

    public setFields(fields:String[])
    {
        return fields.reduce((acc:prismaSelectField, curr:any) => {
            acc[curr as keyof prismaSelectField] = true
            return acc
        }, {})
    }
}