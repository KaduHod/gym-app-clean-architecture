import { describe, expect, it } from "vitest";
import PrismaExercicioRepository from "./PrismaExercicioRepository";
import GetExercisesUseCase from "../../../App/UseCases/Exercices/GetExercises";

describe('Teste Prisma Exercise Repository prisma', () => {
    const repo = new PrismaExercicioRepository()
    it('Should get all exercises', async () => {
        const result = await repo.findAll()
        expect(result.length).toBeTruthy()
    })
    it('Should select Exercise fields', async () => {
        const result = await repo.findAll({
            select: {
                id:true, name:true, force:true
            }
        })
        expect(result.length).toBeTruthy()
    })
    it('Should filter one exercise by his id ', async () => {
        const result = await repo.findAll({
            where:{id:918}
        })
        expect(result.length).toEqual(1)
    })
    it('Should get one exercise em all of his muscles', async () => {
        const result = await repo.findAll({
            where: {id:1017},
            select: {
                id:true, name:true, force:true,
                muscles: {
                    select: {
                        muscle:{
                            select: {
                                name:true
                            }
                        }
                    }
                }
            }
        })

        expect(result).toBeTruthy();
    })

    it('test', async () => {
        let query = {
            "select":{
                "id":true,
                "name":true,
                "muscles":{
                    "select":{
                        "muscle":{
                            "select":{
                                "id":true,
                                "name" : true
                            }
                        }
                    }
                }
            }
        }
        const repo = new PrismaExercicioRepository()
        const case_ = new GetExercisesUseCase(
            repo, query
        )

        
        const result = await case_.main()
        result.forEach((item:any) => {
            console.log(item.muscles)
        })
        // console.log(result)
       
    })
})