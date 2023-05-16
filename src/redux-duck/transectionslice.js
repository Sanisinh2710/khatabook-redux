import { createSlice } from '@reduxjs/toolkit'
import {initialState} from '../utils/constant'




export const transectionSlice = createSlice({
    name: 'transection',
    initialState,
    reducers: {
        addtransection: (state, action) => {
            if (state.length === 0) {
                return state = action.payload
            } else {
                state.push(action.payload)
            }
        },
        updatetransection: (state, action) => {
            for (const e in state) {
                if (parseInt(state[e].id) === parseInt(action.payload.id)) {
                    state[e] = action.payload
                    break
                }
            }
        },
        deletetransection: (state, action) => {
            
            return state = action.payload

            
        }

    }
})


export default transectionSlice.reducer;
export const { addtransection, updatetransection, deletetransection } = transectionSlice.actions