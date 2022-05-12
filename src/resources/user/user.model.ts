import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import IUser from '@/resources/user/user.interface'

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | Boolean> {
    return await bcrypt.compare(password, this.password)
}

export default model<IUser>('user', UserSchema)
