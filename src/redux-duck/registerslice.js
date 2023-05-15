import { createSlice, current } from '@reduxjs/toolkit'

const initialState = [{uname:"Sanisinh",email:"xyz@gmail.com",password:"123456",id:1}]



export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        adduser :(state,action)=>{
            if (state.length === 0) {
                return state = action.payload
            } else {
                state.push(action.payload)
            }
        }
    }
})




export default registerSlice.reducer;
export const {adduser,userlogin} = registerSlice.actions