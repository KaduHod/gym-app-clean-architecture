import { randomUUID } from "crypto";
import { PK } from "../../App/Repositories/Repository";
import { Entity, TAluno, TPersonal } from "./Entities";
import User from "./User";

export default
    class Personal
    extends User
    implements Entity 
{
    public alunos?: TAluno[];
    constructor(attrs: TPersonal)
    {
        super(attrs)
        this.alunos = attrs.alunos ?? undefined
    }
}