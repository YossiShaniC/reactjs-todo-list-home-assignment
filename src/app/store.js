import { configureStore } from '@reduxjs/toolkit'
import toDoListReducer from '../features/toDoList/toDoListSlice'

export default configureStore({
    reducer: {
        toDoList: toDoListReducer,
    },
})