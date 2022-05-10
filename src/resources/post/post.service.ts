import PostModel from '@/resources/post/post.model'
import IPost from '@/resources/post/post.interface'

class PostService {
    private post = PostModel

    /**
     * Create a new post
     */

    public create = async (title: string, body: string): Promise<IPost> => {
        try {
            return await this.post.create({ title, body })
        } catch (e) {
            throw new Error('Unable to create post')
        }
    }
}

export default PostService
