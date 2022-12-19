import { randomUUID } from "crypto";
import { PK } from "../../App/Repositories/Repository";
import { Entity, TPersonal } from "./Entities";

export default
    class Personal
    implements Entity 
{
    public userId:PK
    public id: PK;
    constructor(attrs: TPersonal){
        this.id = attrs.id ?? randomUUID()
        this.userId = attrs.userId
    }
}