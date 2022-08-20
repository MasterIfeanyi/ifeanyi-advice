import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

const BASE_URL = "http://localhost:3500/posts"

const initialState = {
    posts: [],
    status: "idle",
    error: ""
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get(BASE_URL)
    console.log(response.data)
    return response?.data
})

export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost) => {
    const response = await axios.post(BASE_URL, initialPost);
    return response?.data
})

export const updateOldPost = createAsyncThunk("post/updatePost", async (initialPost) => {
    const {id} = initialPost
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, initialPost)
        return response.data
    } catch (error) {
        return error.message
    }
})

export const deleteOldPost = createAsyncThunk("post/deletePost", async (initialPost) => {
    const {id} = initialPost
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        if (response?.status === 200) return initialPost;
        return `${response.status} : ${response.statusText}`;
    } catch (error) {
        return error.message
    }
})

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
        const { post } = action.payload;
        state.posts.unshift(post);
      },
    updatePost: (state, action) => {
        const { id, title, body } = action.payload;
        let existingUser = state.find((user) => user.id === id);
        if (existingUser) {
            existingUser = {...existingUser, id, title, body}
        }
      },
    deletePost: (state, action) => {
        const { id } = action.payload;
        state.filter(post => post.id !== id);
    }
  },
  extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.posts = state.posts.concat(action.payload);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                // add payload to state
                state.posts.unshift(action.payload)
            })
            .addCase(updateOldPost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log("update could not complete");
                    console.log(action.payload)
                    return 
                }

                const { id } = action.payload;
                const OldPosts = state.posts(post => post.id !== id);
                state.posts = [...OldPosts, action.payload];
            })
            .addCase(deleteOldPost.fulfilled, (state, action) => {
                if (!action?.payload.id) {
                    console.log("could not delete");
                    console.log(action.payload)
                    return 
                }

                const { id } = action.payload;
                const OldPosts = state.posts.filter(post => post.id !== id)
                state.posts = OldPosts
            })
    }
})


//selectors to make accessing state easier
export const selectAllPosts = (state) => state.posts.posts
export const getPostsError = (state) => state.posts.error
export const getPostsStatus = (state) => state.posts.status

// selector to find a single post
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);


// Action creators are generated for each case reducer function
export const { addPost, deletePost, updatePost  } = postsSlice.actions


// reducer function for the whole slice.
export default postsSlice.reducer