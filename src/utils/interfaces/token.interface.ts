import { Schema } from 'mongoose'

interface IToken extends Object {
    id: Schema.Types.ObjectId
    expiresIn: Number
}

export default IToken
