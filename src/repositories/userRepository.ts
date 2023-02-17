import { IUser } from "../interfaces/IUser";
import User from "../models/User";

export class UserRepository {
    async create(data: IUser) {
        const user = new User(data);
        await user.save();
    }

    async authenticate(email: string, password: string) {
        const res = await User.findOne({
            email: email, password: password
        });
        return res;
    }
}