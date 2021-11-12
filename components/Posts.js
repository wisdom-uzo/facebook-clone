import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Post from './Post';

function Posts() {

    const [value, loading, error] = useCollection(
        db.collection('posts').orderBy('timestamp', 'desc')
      );
   
    return (
        <div>
            {value?.docs.map((post) => (
                <Post  
                    keys = {post.id}
                    name={post.data().name}
                    massage={post.data().massage}
                    email={post.data().email}
                    image={post.data().image}
                    postImage={post.data().postImage}
                    timestamp={post.data().timestamp}
                />
            ))}
        </div>
    )
}

export default Posts
