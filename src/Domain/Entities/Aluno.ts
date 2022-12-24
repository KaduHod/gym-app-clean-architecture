import { randomUUID } from "crypto";
import { PK } from "../../App/Repositories/Repository";
import { Entity, TAluno } from "./Entities";

export default 
    class Aluno 
    implements Entity
{
    public user_id:PK
    public personal_id?:PK
    public id?:PK | null
    
    constructor(attrs: TAluno)
    {
        this.id = attrs.id
        this.user_id = attrs.user_id 
        this.personal_id = attrs.personal_id
    }
}