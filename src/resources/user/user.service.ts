import UserModel from "@/resources/user/user.model";
import token from "@/utils/token";

class UserService {
    private user = UserModel

    /**
     * Register a new user
     */

    public async register (name: string, email: string, password: string, role: string): Promise<string | Error> {
        try {
            const user = await this.user.create({ name, email, password, role })
            return token.createToken(user)
        } catch (error) {
            throw new Error('Unable to create user')
        }
    }

    /**
     * Login a user
     */

    public async login(email: string, password: string): Promise<string | Error> {
        try {
            const user = await this.user.findOne({email})
            if (!user) {
                throw new Error('Unable to find user with this email address')
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user)
            } else {
                throw new Error('Wrong credentials')
            }

        } catch (error) {
            throw new Error('Unable to login user')
        }
    }
}

export default UserService