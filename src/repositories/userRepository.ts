import User from "../models/User";

export const userRepository = {

    create: async (data: any) => {
        const user = new User(data);
        await user.save();
    },

    authenticate: async (data: any) => {
        const res = await User.findOne({
            email: data.email, password: data.password
        });
        return res;
    },
}