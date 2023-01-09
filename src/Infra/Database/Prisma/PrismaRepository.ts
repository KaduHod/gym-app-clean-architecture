type prismaSelectField = {
    [key:string]:boolean
}
export default abstract class PrismaRepository
{
    public setFields(fields:String[])
    {
        return fields.reduce((acc:prismaSelectField, curr:any) => {
            acc[curr as keyof prismaSelectField] = true
            return acc
        }, {})
    }
}