export default class AlunoNotFound extends Error 
{
    constructor(){
        super('Aluno not found!')
    }
}