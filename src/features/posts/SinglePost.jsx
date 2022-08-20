import {useState} from 'react'
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux/es/hooks/useSelector"
import { selectPostById } from './postsSlice'
import { updateOldPost } from './postsSlice'

const SinglePost = () => {

    const { postId } = useParams();

    const dispatch = useDispatch();

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    const [title, setTitle] = useState(post?.tite);

    const [body, setBody] = useState(post?.body);

    const [requestStatus, setRequestStatus] = useState("idle");

    const canSave = [title, body].every(Boolean) && requestStatus === "idle";


    const handleTitle = (e) => setTitle(e.target.value);
    const handleBody = (e) => setBody(e.target.value);

    const onSavePost = (e) => {
        e.preventDefault();
        if (canSave) {
            try {
                dispatch(updateOldPost({ title, body, id: post.id })).unwrap();
                setTitle("");
                setBody("");
            } catch (error) {
                console.log(`There was an error, ${error}`)
            } finally {
                setRequestStatus("idle");
            }
        }
    }



  return (
    <section className="section">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="h1">Post {title}</h1>
                </div>
            </div>

            <div className="row d-flex justify-content-center">
                <div className="col-12">
                    <form className="row" onSubmit={onSavePost}>
                        <div className="col-md-8">
                            <div className="col-12 form-group">
                                <label htmlFor="title" className="form-label"></label>
                                <input 
                                    id="title"
                                    type="text" 
                                    className="form-control" 
                                    value={title}
                                    onChange={handleTitle}
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label htmlFor="body" className="form-label">Body:</label>
                                <textarea 
                                    id="body" 
                                    type="text"
                                    className="form-control"
                                    value={body}
                                    onChange={handleBody}
                                >
                                </textarea>
                            </div>
                            <div className="text-center">
                                <button
                                    type="button"
                                    className="btn btn-primary form-button"
                                    disabled={!canSave}
                                >
                                    Save Post
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SinglePost