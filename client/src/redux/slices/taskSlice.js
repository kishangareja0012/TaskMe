import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
    status: 'idle',
    error: null,
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        getTasks: (state, action) => {
            state.tasks = action.payload;
        },
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { addTask, getTasks, setTasks, setStatus, setError } = taskSlice.actions;

export default taskSlice.reducer;
