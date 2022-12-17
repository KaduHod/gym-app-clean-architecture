import { PK } from "../../App/Repositories/Repository";

export type Entity = {
    id:PK
    [key:string] : any
}

export type User = Entity & {

}

export type Aluno = Entity & {

}

export type Personal = Entity & {

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

