import { Document } from 'mongoose'

interface IUser extends Document {
    email: string
    name: string
    password: string
    role: string

    isValidPassword(password: string): Promise<Error | Boolean>
}

export default IUser