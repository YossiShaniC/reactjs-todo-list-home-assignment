import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const toDoListSlice = createSlice({
  name: 'toDoList',
  initialState,
  reducers: {
    setToDoList: (newToDoList) => {
      return Object.assign({}, state, { ToDoList: Array.from(newToDoList) });
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToDoList } = toDoListSlice.actions

export default toDoListSlice.reducer