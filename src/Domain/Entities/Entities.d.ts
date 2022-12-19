import { PK } from "../../App/Repositories/Repository";

export type Entity = {
    id?:PK
    [key:string] : any
}

export type TUser = Entity & {
    name:string,
    nickname:string,
    email:string,
    password:string
}

export type TAluno = Entity & {
    userId:PK
    personalId?:PK
}

export type TPersonal = Entity & {
    userId:PK
}

export type Treino = Entity & {

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

