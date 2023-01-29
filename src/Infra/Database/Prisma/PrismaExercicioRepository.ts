import { ExerciseRepository, PK, Repository } from "../../../App/Repositories/Repository";
import { Entity, Exercicio, TExercicio, TExerciseMuscleRole } from "../../../Domain/Entities/Entities";
import PrismaRepository from "./PrismaRepository";
import {client} from './client'
import { Prisma } from "@prisma/client";

export default 
    class PrismaExercicioRepository
    extends PrismaRepository
    implements ExerciseRepository
{
    public tableName: any;
    constructor()
    {
        super()
        this.tableName = 'exercicios'
    }

    musclesFromExercise(exercise_id: PK, fields: any, roles: TExerciseMuscleRole[] | null): Promise<any> {
        throw new Error("Method not implemented.");
    }

    findAll(options?: Prisma.exerciciosFindManyArgs): Promise<Exercicio[]> {
        return options ? this.conn.exercicios.findMany(options) : this.conn.exercicios.findMany()
    }

    async findBy(
        options: Prisma.exerciciosFindManyArgs | Prisma.exerciciosFindUniqueArgs,
        first:boolean,
    ): Promise<Exercicio[] | Exercicio | null> 
    {
        if(first)
        {
            return await this
                            .conn
                            .exercicios
                            .findUnique(options as Prisma.exerciciosFindUniqueArgs)
        }
        
        return await this
                        .conn
                        .exercicios
                        .findMany(options as Prisma.exerciciosFindManyArgs)
    }

    async findByPK(options: Prisma.exerciciosFindUniqueArgs): Promise<Exercicio | null> 
    {
        return await this
                        .conn
                        .exercicios
                        .findUnique(options)
    }

    save(t: Entity | Entity[]): Promise<any> {
        throw new Error("Method not implemented.");
    }

    delete(pk: PK): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
    async exists(pk: PK): Promise<boolean> {
        return !!(await this.conn.exercicios.findUnique({
            where:{
                id:pk
            },
            select:{
                id:true
            }
        }))
    }

}