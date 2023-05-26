import { PayloadAction, createSlice} from '@reduxjs/toolkit'
import { RegisterType } from '../interface/app_interface'

const initialState = [{uname:"Sanisinh",email:"xyz@gmail.com",password:"123456",id:1}]



export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        adduser :(state:RegisterType[],action:PayloadAction<any>)=>{
            if (state.length === 0) {
                return state = action.payload
            } else {
                state.push(action.payload)
            }
        }
    }
})




export default registerSlice.reducer;
export const {adduser} = registerSlice.actions