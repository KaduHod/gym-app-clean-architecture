import { randomUUID } from "crypto";
import { PK } from "../../App/Repositories/Repository";
import { Entity, TPersonal } from "./Entities";

export default
    class Personal
    implements Entity 
{
    public user_id:PK
    public id?: PK | null;
    constructor(attrs: TPersonal){
        this.id = attrs.id
        this.user_id = attrs.user_id
    }
}