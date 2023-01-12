import { PK, Repository } from "../../../App/Repositories/Repository";
import { Entity, Exercicio, TExercicio } from "../../../Domain/Entities/Entities";
import PrismaRepository from "./PrismaRepository";
import {client} from './client'
import { Prisma } from "@prisma/client";

export default 
    class PrismaExercicioRepository
    extends PrismaRepository
    implements Repository<Exercicio, TExercicio>
{
    public conn: any;
    public tableName: any;
    constructor()
    {
        super()
        this.conn = client
        this.tableName = 'exercicios'
    }
    findAll(options?: Prisma.exerciciosFindManyArgs): Promise<Exercicio[]> {
        return options ? this.conn.exercicios.findMany(options) : this.conn.exercicios.findMany()
    }
    findBy(attrs: Partial<TExercicio>, first?: boolean, fields?: string[] | undefined): Promise<Entity[]> {
        throw new Error("Method not implemented.");
    }
    findByPK(pk: PK, fields?: string[] | undefined): Promise<Entity> {
        throw new Error("Method not implemented.");
    }
    save(t: Entity | Entity[]): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(pk: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }
    exists(pk: PK): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}