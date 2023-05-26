import registerSlice  from "./registerslice";
import transectionSlice  from "./transectionslice";

const { configureStore } = require("@reduxjs/toolkit");



export const store = configureStore({
    reducer: {
        transection : transectionSlice,
        register : registerSlice
    },
  })


  
  
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch