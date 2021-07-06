import bcrypt from 'bcrypt';
import { Encrypter } from './protocols';

class EncrypterAdapter implements Encrypter {
    private rounds: 10;

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.rounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    }

    comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}

export default EncrypterAdapter;
