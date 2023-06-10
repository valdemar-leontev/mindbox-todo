import { createSlice } from '@reduxjs/toolkit'
import { TaskModel } from '../models/task-models'

let localStorageTaskList = JSON.parse(localStorage.getItem('taskList') || "[]");

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        reduxTaskList: localStorageTaskList
    },
    reducers: {
        changeTaskList: (state, taskList: TaskModel[] | any) => {
            state.reduxTaskList = taskList.payload;
        },

        changeActiveState: (state, id: number | any) => {
            const completedTask = state.reduxTaskList.find((task: TaskModel) => task.id === id.payload);

            if (!completedTask) {
                return;
            }

            completedTask.active = !completedTask.active
        },

        create: (state, newTask: TaskModel | any) => {
            if (!newTask || !newTask.payload.content) {
                alert('Enter task content.');

                return;
            }

            state.reduxTaskList = [...state.reduxTaskList, newTask.payload];

            localStorage.setItem('taskList', JSON.stringify(state.reduxTaskList));
        },
    },
})

export const { changeTaskList, changeActiveState, create, } = tasksSlice.actions;

export default tasksSlice.reducer;