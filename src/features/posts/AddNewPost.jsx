import { useState } from 'react'
import { addNewPost } from './postsSlice';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';

const AddNewPost = () => {


    const [body, setBody] = useState("");

    const [title, setTitle] = useState("");

    const [addRequestStatus, setAddRequestStatus] = useState("idle");

    const dispatch = useDispatch();

    const userId = Math.floor(Math.random() * 99) + 1;


    const handleBody = (e) => setBody(e.target.value);

    const handleTitle = (e) => setTitle(e.target.value);

    const canSave = [title, body].every(Boolean) && addRequestStatus === "idle";

    const onSavePost = async (e) => {
        e.preventDefault();
        if (canSave) {
            try {
                dispatch(addNewPost({ title, body, userId })).unwrap();
                setTitle("");
                setBody("");
            } catch (error) {
                console.log(`There was an error, ${error}`)
            } finally {
                setAddRequestStatus("idle");
            }
        }
    }

  return (
    <section className="section">
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <h1 className="h1">Add a new post</h1>
                </div>
            </div>

            <div className="row d-flex justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={onSavePost} className="row">
                        <div className="col-12 form-group">
                            <label htmlFor="title" className='form-label'>Title</label>
                            <input 
                                type="text" 
                                id="title"
                                className="form-control"
                                placeholder='Enter your title'
                                value={title}
                                onChange={handleTitle}
                            />
                        </div>
                        <div className="col-12 form-group">
                            <label htmlFor="body" className='form-label'>Content</label>
                            <textarea 
                                name="" 
                                id="body" 
                                className='form-control'
                                value={body}
                                onChange={handleBody}
                                >
                            </textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-primary form-button"
                                disabled={!canSave}
                            >
                                Save Post
                            </button>
                        </div>
                    </form>  
                </div>
            </div>
              
        </div>
    </section>
  )
}

export default AddNewPost