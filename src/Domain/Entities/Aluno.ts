import { randomUUID } from "crypto";
import { PK } from "../../App/Repositories/Repository";
import { Entity, TAluno, TPersonal } from "./Entities";
import Personal from "./Personal";
import User from "./User";

export default 
    class Aluno 
    extends User
    implements Entity
{
    public personal?: Personal
    constructor(attrs:TAluno){
        super(attrs)
        this.personal = attrs.personal ?? undefined
    }
}