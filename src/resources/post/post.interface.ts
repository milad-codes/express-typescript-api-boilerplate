import { Document } from 'mongoose'

interface IPost extends Document {
    title: string
    body: string
}

export default IPost