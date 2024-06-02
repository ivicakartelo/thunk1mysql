import {AddPostForm} from './features/posts/AddPostForm'
import {PostsList} from './features/posts/PostsList'

console.log("The app.js rendered")

const App = () => {
    return (
        <>
            <AddPostForm />
            <PostsList />
        </>
    )
}
export default App