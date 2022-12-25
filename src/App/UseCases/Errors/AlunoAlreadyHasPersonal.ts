export default class AlunoAlreadyHasPersonal extends Error 
{
    constructor()
    {
        super('Aluno already has personal!')
    }
}