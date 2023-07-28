import { configureStore } from "@reduxjs/toolkit";
import plannerReducer from "./plannerSlice";

export const store = configureStore({
    reducer: {
        planner: plannerReducer
    }
})