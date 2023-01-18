import PrismaExercicioRepository from "../Database/Prisma/PrismaExercicioRepository"
import PrismaPersonalRepository from "../Database/Prisma/PrismaPersonalRepository"
import PrismaAlunoRepository from "../Database/Prisma/PrismaAlunoRepository"
import PrismaUserRepository from "../Database/Prisma/PrismaUserRepository"
import GetExercisesUseCase from "../../App/UseCases/Exercices/GetExercises"
import GetPersonaisUseCase from "../../App/UseCases/Personal/GetPersonais"
import GetExerciseUseCase from "../../App/UseCases/Exercices/GetExercise"
import GetPersonalUseCase from "../../App/UseCases/Personal/GetPersonal"
import GetAlunosUseCase from "../../App/UseCases/Aluno/GetAlunos"
import GetAlunoUseCase from "../../App/UseCases/Aluno/GetAluno"
import GetUsersUseCase from "../../App/UseCases/Users/getUsers"
import GetUserUseCase from "../../App/UseCases/Users/GetUser"
import graphQlMapper from "../Resolvers/mappers/graphQl"
import PrismaMapper from "../Database/Prisma/Mappers/prisma"

export type GraphQlObject = {
    [key:string]:any
}

const YogaRequest = (fn:Function) => {
    return (...args:any) => {
        const body = graphQlMapper.toJson(args[2].params.query);
        console.log(body)
        return fn(body);
    }
}

let userResolver = async (body:GraphQlObject) => {
    const userFields = PrismaMapper.user.getFields(body)
    const select = PrismaMapper.user.setSelect({userFields})
    const where = PrismaMapper.user.setWhere(body);

    return await (
        new GetUserUseCase(
            new PrismaUserRepository(),
            {select, where}
        )
    ).main()
}

let usersResolver  = async (body:GraphQlObject) => {
    const userFields = PrismaMapper.user.getFields(body)
    const select = PrismaMapper.user.setSelect({userFields})
    
    return await (
        new GetUsersUseCase(
            new PrismaUserRepository(), 
            {select}
        )
    ).main()
}

let alunosResolver = async (body:GraphQlObject) => {
    const userFields = PrismaMapper.aluno.getUserFields(body)
    const alunoFields = PrismaMapper.aluno.getFields(body)
    const select = PrismaMapper.aluno.setSelect({userFields, alunoFields})

    return  await (
        new GetAlunosUseCase(
            new PrismaAlunoRepository,
            {select}
        )
    ).execute();
}

let personaisResolver = async (body:GraphQlObject) => {
    const personalFields = PrismaMapper.personal.getFields(body);
    const userFields = PrismaMapper.personal.getUserFields(body);
    const alunosFields = PrismaMapper.personal.getAlunoFields(body);
    const alunosUserFields = PrismaMapper.personal.getAlunoUserFields(body);
    const select = PrismaMapper.personal.setSelect({
        personalFields, 
        userFields,
        alunosFields,
        alunosUserFields
    })
    
    return await (
        new GetPersonaisUseCase(
            new PrismaPersonalRepository,
            {select}
        ).main()
    )
}

let personalResolver = async (body:GraphQlObject) => {
    const personalFields = PrismaMapper.personal.getFields(body);
    const userFields = PrismaMapper.personal.getUserFields(body);
    const alunosFields = PrismaMapper.personal.getAlunoFields(body);
    const alunosUserFields = PrismaMapper.personal.getAlunoUserFields(body);
    const select = PrismaMapper.personal.setSelect({
        personalFields, 
        userFields,
        alunosFields,
        alunosUserFields
    })
    const where = PrismaMapper.personal.setWhere(body)

    return await (
        new GetPersonalUseCase(
            new PrismaPersonalRepository,
            {select, where}
        ).main()
    )
}

let alunoResolver = async (body:GraphQlObject) => {
    const alunoFields = PrismaMapper.aluno.getFields(body)
    const userFields = PrismaMapper.aluno.getUserFields(body)

    const select = PrismaMapper.aluno.setSelect({alunoFields, userFields})
    const where = PrismaMapper.aluno.setWhere(body)

    return await (
        new GetAlunoUseCase(
            new PrismaAlunoRepository,
            {select, where}
        ).execute()
    )
}

let exercisesResolver = async (body:GraphQlObject) => {
    const exercicioFields = PrismaMapper.exercicios.getFields(body)
    const muscleFields = PrismaMapper.exercicios.getMuscleFields(body)
    const queryOptions = PrismaMapper.exercicios.queryOption({exercicioFields, muscleFields})  
    
    return await (
        new GetExercisesUseCase(
            new PrismaExercicioRepository(),
            queryOptions,
            PrismaMapper.exercicios.toArrExercicios
        )
    ).main()
}

let exerciseResolver = async(body:GraphQlObject) => {
    const exercicioFields = PrismaMapper.exercicio.getFields(body)
    const muscleFields = PrismaMapper.exercicio.getMuscleFields(body)
    const where = PrismaMapper.exercicio.setWhere(body)
    const select = PrismaMapper.exercicio.setSelect({exercicioFields, muscleFields})
    
    return await (
        new GetExerciseUseCase(
            new PrismaExercicioRepository,
            {select, where},
            PrismaMapper.exercicio.toGraphQlExercise
        ).main()
    )
}


userResolver = YogaRequest(userResolver);
usersResolver = YogaRequest(usersResolver);
alunoResolver = YogaRequest(alunoResolver);
alunosResolver = YogaRequest(alunosResolver);
exerciseResolver = YogaRequest(exerciseResolver);
exercisesResolver = YogaRequest(exercisesResolver);
personalResolver = YogaRequest(personalResolver);
personaisResolver = YogaRequest(personaisResolver);

export default {
    Query:{
        user: userResolver,
        users: usersResolver,
        alunos: alunosResolver,
        aluno: alunoResolver,
        exercises: exercisesResolver,
        exercise: exerciseResolver,
        personais: personaisResolver,
        personal: personalResolver
    }
}
