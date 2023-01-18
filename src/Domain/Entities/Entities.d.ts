import { PK } from "../../App/Repositories/Repository";

export type Entity = {
    id?:PK | null
    [key:string] : any
}

export type TUser = Entity & {
    name:string,
    nickname:string,
    email:string,
    password:string
    permissions?: TPermission[]
}

export type TAluno = TUser & {
    personal? : TPersonal 
}

export type TPersonal = TUser & {
    alunos?: TAluno[]
}

export type TPermission = {
    id?:PK,
    title: string
}

export type UserFields = {
    id?:boolean
    name?:boolean
    nickname?:boolean
    email?:boolean
    password?:boolean
}

export type Treino = Entity & {

}

export type TExercicio = Entity & {
    name:string,
    force:string,
    link:string | null,
    execution:string | null
}

export type Exercicio = Entity & {
    
}

export type Periodizacao = Entity & {

}

export type Articulation = Entity & {

}

export type Movement = Entity & {

}

export type TMuscle = Entity & {
    name:string,
    image:string | null
}

export type TExerciseMuscleRole = 'agonist' | 'antagonist' | 'synergist' | 'antagonist stabilizer' | 'stabilizer' | 'dynamic stabilizer'

export type TExerciseMuscle = TMuscle & {
    role:TExerciseMuscleRole
}


