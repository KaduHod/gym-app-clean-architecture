import crypto from 'crypto'

var salt = crypto.randomBytes(16).toString('hex');

export default class Password 
{
    public static encrypt(password:string): string
    {
        if(!password)
            throw new Error('Must pass password as argument');
        
        return crypto
                    .pbkdf2Sync(
                        password as string, 
                        salt, 
                        1000, 
                        64, 
                        `sha512`
                    ).toString(`hex`);
    }

    public static validate(password: string, hashedPassword: string)
    {
        const hash = crypto
                        .pbkdf2Sync(
                            password, 
                            salt, 
                            1000, 
                            64, 
                            `sha512`
                        ).toString(`hex`);
            return hash === hashedPassword;
    }
}