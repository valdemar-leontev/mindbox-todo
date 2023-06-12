import { createSlice } from '@reduxjs/toolkit'
import { TaskModel } from '../models/task-models'

let localStorageTaskList = JSON.parse(localStorage.getItem('taskList') || "[]");

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        originalTaskList: localStorageTaskList,
        filteredTaskList: localStorageTaskList,
        currentFilter: 'All'
    },
    reducers: {
        changeTaskList: (state, taskList: TaskModel[] | any) => {
            state.originalTaskList = taskList.payload;
        },

        changeActiveState: (state, id: number | any) => {
            const completedTask = state.originalTaskList.find((task: TaskModel) => task.id === id.payload);

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

            state.originalTaskList = [...state.originalTaskList, newTask.payload];

            localStorage.setItem('taskList', JSON.stringify(state.originalTaskList));
        },

        filterTaskList: (state, currentFilter: string | any) => {
            switch (currentFilter.payload) {
                case 'All':
                    state.filteredTaskList = state.originalTaskList;

                    break;
                case 'Active':
                    state.filteredTaskList = state.originalTaskList.filter((task: any) => task.active);

                    break;
                case 'Completed':
                    state.filteredTaskList = state.originalTaskList.filter((task: any) => !task.active);

                    break;
                default:
                    break;
            }
        },
    },
})

export const { changeTaskList, changeActiveState, create, filterTaskList } = tasksSlice.actions;

export default tasksSlice.reducer;