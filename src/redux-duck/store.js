import registerSlice  from "./registerslice";
import transectionSlice  from "./transectionslice";

const { configureStore } = require("@reduxjs/toolkit");



export const store = configureStore({
    reducer: {
        transection : transectionSlice,
        register : registerSlice
    },
  })
