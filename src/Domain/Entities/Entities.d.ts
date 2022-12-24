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
}

export type TAluno = Entity & {
    user_id:PK
    personal_id?:PK
}

export type TPersonal = Entity & {
    user_id:PK
}

export type Treino = Entity & {

}

export type TExercicio = Entity & {

}

export type Exercicio = Entity & {

}

export type Periodizacao = Entity & {

}

export type Articulation = Entity & {

}

export type Movement = Entity & {

}

export type Muscle = Entity & {

}

