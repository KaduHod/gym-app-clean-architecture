import { PK } from "../../App/Repositories/Repository";
import { Entity, TUser } from "./Entities";
import { randomUUID } from "crypto"
import Password from "../../Helpers/Password";
import { Print } from "./Decorators";


export default 
    class User 
    implements Entity
{
    public id?:PK | null
    public name:string
    public nickname:string
    public email:string
    public password:string

    
    constructor(attributes:TUser){
        this.id = attributes.id
        this.name = attributes.name
        this.nickname = attributes.nickname
        this.email = attributes.email
        this.password = Password.encrypt(attributes.password)
    }
}