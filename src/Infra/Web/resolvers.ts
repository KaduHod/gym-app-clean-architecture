import PrismaExercicioRepository from "../Database/Prisma/PrismaExercicioRepository"
import PrismaPersonalRepository from "../Database/Prisma/PrismaPersonalRepository"
import PrismaAlunoRepository from "../Database/Prisma/PrismaAlunoRepository"
import PrismaUserRepository from "../Database/Prisma/PrismaUserRepository"
import GetExercisesUseCase from "../../App/UseCases/Exercices/GetExercises"
import GetPersonaisUseCase from "../../App/UseCases/Personal/GetPersonais"
import GetExerciseUseCase from "../../App/UseCases/Exercices/GetExercise"
import GetPersonalUseCase from "../../App/UseCases/Personal/GetPersonal"
import GetAlunosUseCase from "../../App/UseCases/Aluno/getAlunos"
import GetAlunoUseCase from "../../App/UseCases/Aluno/GetAluno"
import GetUsersUseCase from "../../App/UseCases/Users/getUsers"
import GetUserUseCase from "../../App/UseCases/Users/GetUser"
import graphQlMapper from "../Resolvers/mappers/graphQl"
import PrismaPersonalMapper from '../Database/Prisma/Mappers/personais'
import PrismaAlunoMapper from '../Database/Prisma/Mappers/alunos'
import PrismaUserMapper  from '../Database/Prisma/Mappers/users'
// import PrismaMapper from "../Database/Prisma/Mappers/prisma"


import { writeFile } from "fs/promises"

export type GraphQlObject = {
    [key:string]:any
}


const YogaRequest = (fn:Function) => {
    return (...args:any) => {
        const body = graphQlMapper.toJson(args[2].params.query);
        console.log('==== Yoga request body ====')
        console.log(body)
        console.log('===========================')
        return fn(body);
    }
}

let usersResolver  = async (body:GraphQlObject) => {
    const select =  PrismaUserMapper.setSelect(body);
    const where = PrismaUserMapper.setWhere(body);
    return await (
        new GetUsersUseCase(
            new PrismaUserRepository(), 
            {select, where},
            PrismaUserMapper.toArrayGraphQL
        )
    ).main()
}

let alunosResolver = async (body:GraphQlObject) => {
    const select = PrismaAlunoMapper.setSelect(body)

    return  await (
        new GetAlunosUseCase(
            new PrismaAlunoRepository,
            {select},
            PrismaAlunoMapper.toGraphQlAlunoObject
        )
    ).execute();
}

let alunoResolver = async (body:GraphQlObject) => {
    const select = PrismaAlunoMapper.setSelect(body);
    const where = PrismaAlunoMapper.setWhere(body);

    return await (
        new GetAlunoUseCase(
            new PrismaAlunoRepository,
            {select, where},
            PrismaAlunoMapper.toGraphQlAlunoObject
        ).execute()
    )
}

let personaisResolver = async (body:GraphQlObject) => {
    const select = PrismaPersonalMapper.setSelect(body)
    const where = PrismaPersonalMapper.setWhere(body)
    // await writeFile('query.json', JSON.stringify({select, where}))
    // const alunosFields = PrismaMapper.personal.getAlunoFields(body);
    // const alunosUserFields = PrismaMapper.personal.getAlunoUserFields(body);
    // const select = PrismaMapper.personal.setSelect({
    //     personalFields, 
    //     userFields,
    //     alunosFields,
    //     alunosUserFields
    // })
    // return [{
    //     id:1,
    //     name:'carlos',
    //     nickname:''
    // }]
    return await (
        new GetPersonaisUseCase(
            new PrismaPersonalRepository,
            {select, where},
            PrismaPersonalMapper.toArrayGraphQL
        ).main()
    )
}

let personalResolver = async (body:GraphQlObject) => {
    // const personalFields = PrismaMapper.personal.getFields(body);
    // const userFields = PrismaMapper.personal.getUserFields(body);
    // const alunosFields = PrismaMapper.personal.getAlunoFields(body);
    // const alunosUserFields = PrismaMapper.personal.getAlunoUserFields(body);
    // const select = PrismaMapper.personal.setSelect({
        // personalFields, 
        // userFields,
        // alunosFields,
        // alunosUserFields
    // })
    // const where = PrismaMapper.personal.setWhere(body)

    return []

    // return await (
        // new GetPersonalUseCase(
            // new PrismaPersonalRepository,
            // {select, where}
        // ).main()
    // )
}



let exercisesResolver = async (body:GraphQlObject) => {
    // const exercicioFields = PrismaMapper.exercicios.getFields(body)
    // const muscleFields = PrismaMapper.exercicios.getMuscleFields(body)
    // const queryOptions = PrismaMapper.exercicios.queryOption({exercicioFields, muscleFields})  
    // 
    // return await (
        // new GetExercisesUseCase(
            // new PrismaExercicioRepository(),
            // queryOptions,
            // PrismaMapper.exercicios.toArrExercicios
        // )
    // ).main()

    return []
}

let exerciseResolver = async(body:GraphQlObject) => {
    // const exercicioFields = PrismaMapper.exercicio.getFields(body)
    // const muscleFields = PrismaMapper.exercicio.getMuscleFields(body)
    // const where = PrismaMapper.exercicio.setWhere(body)
    // const select = PrismaMapper.exercicio.setSelect({exercicioFields, muscleFields})
    // 
    // return await (
        // new GetExerciseUseCase(
            // new PrismaExercicioRepository,
            // {select, where},
            // PrismaMapper.exercicio.toGraphQlExercise
        // ).main()
    // )
    return []
}

usersResolver = YogaRequest(usersResolver);
alunoResolver = YogaRequest(alunoResolver);
alunosResolver = YogaRequest(alunosResolver);
exerciseResolver = YogaRequest(exerciseResolver);
exercisesResolver = YogaRequest(exercisesResolver);
personalResolver = YogaRequest(personalResolver);
personaisResolver = YogaRequest(personaisResolver);

export default {
    Query:{
        users: usersResolver,
        alunos: alunosResolver,
        aluno: alunoResolver,
        exercises: exercisesResolver,
        exercise: exerciseResolver,
        personais: personaisResolver,
        personal: personalResolver
    }
}
