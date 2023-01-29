import { Entity } from "../Entities/Entities";

export interface Factory<T extends Entity, TT>
{
    create(attrs:TT):T
    createRandom():T 
    createFromPartialAttributes(attrs:Partial<TT>):T
}
