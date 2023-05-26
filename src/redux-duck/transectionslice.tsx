import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {initialState} from '../utils/constant'

import {TransectionType} from "../interface/app_interface"


export const transectionSlice = createSlice({
    name: 'transection',
    initialState,
    reducers: {
        addtransection: (state:TransectionType[], action:PayloadAction<any>) => {
            if (state.length === 0) {
                return state = action.payload
            } else {
                state.push(action.payload)
            }
        },
        updatetransection: (state:TransectionType[], action:PayloadAction<any>) => {
            for (const e in state) {
                if (Number(state[e].id) === Number(action.payload.id)) {
                    state[e] = action.payload
                    break
                }
            }
        },
        deletetransection: (state:TransectionType[], action:PayloadAction<any>) => {
            
            return state = action.payload

            
        }

    }
})


export default transectionSlice.reducer;
export const { addtransection, updatetransection, deletetransection } = transectionSlice.actions