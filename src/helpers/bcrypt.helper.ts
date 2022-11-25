import * as bcrypt from 'bcryptjs';

export async function hashpassword(password:any): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}