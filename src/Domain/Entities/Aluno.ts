import { randomUUID } from "crypto";
import { PK } from "../../App/Repositories/Repository";
import { Entity, TAluno } from "./Entities";

export default 
    class Aluno 
    implements Entity
{
    public userId:PK
    public personalId?:PK
    public id:PK
    
    constructor(attrs: TAluno)
    {
        this.id = attrs.id ?? randomUUID()
        this.userId = attrs.userId 
        this.personalId = attrs.personalId
    }
}