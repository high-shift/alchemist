import { UserJson } from '../entity/User';

declare global {
    namespace Express {
        interface Request {
            user: UserJson
        }
    }
}
