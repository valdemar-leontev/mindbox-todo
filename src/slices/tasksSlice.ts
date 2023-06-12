import { createSlice } from '@reduxjs/toolkit';
import { TaskModel } from '../models/task-models';

let localStorageTaskList = JSON.parse(localStorage.getItem('taskList') || "[]");

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        originalTaskList: localStorageTaskList,
        filteredTaskList: localStorageTaskList,
        currentFilter: 'All',
        collapseMode: false
    },
    reducers: {
        changeTaskList: (state, taskList: TaskModel[] | any) => {
            state.originalTaskList = taskList.payload;
        },

        create: (state, newTask: TaskModel | any) => {
            if (!newTask || !newTask.payload.content) {
                alert('Enter task content.');

                return;
            }

            state.originalTaskList = [...state.originalTaskList, newTask.payload];

            localStorage.setItem('taskList', JSON.stringify(state.originalTaskList));
        },

        changeTaskContent: (state, task: TaskModel | any) => {
            if (!task || !task.payload.content || !task.payload.id) {
                return;
            }

            const currentlyEditedTaskIndex = state.filteredTaskList.map((task: TaskModel) => task.id).indexOf(task.payload.id);
            if (currentlyEditedTaskIndex >= 0) {
                state.filteredTaskList[currentlyEditedTaskIndex].content = task.payload.content;
            }

            const currentlyEditedOriginalTaskIndex = state.originalTaskList.map((task: TaskModel) => task.id).indexOf(task.payload.id);
            if (currentlyEditedOriginalTaskIndex >= 0) {
                state.originalTaskList[currentlyEditedOriginalTaskIndex].content = task.payload.content;
            }

            localStorage.setItem('taskList', JSON.stringify(state.originalTaskList));
        },

        changeActiveState: (state, id: number | any) => {
            const completedTask = state.originalTaskList.find((task: TaskModel) => task.id === id.payload);

            if (!completedTask) {
                return;
            }

            completedTask.active = !completedTask.active

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

        changeFilter: (state, filter: string | any) => {
            state.currentFilter = filter.payload;
        },

        toggleCollapseMode: (state) => {
            state.collapseMode = !state.collapseMode;
        }
    },
})

export const { changeTaskList, create, changeActiveState, changeTaskContent, filterTaskList, changeFilter, toggleCollapseMode } = tasksSlice.actions;

export default tasksSlice.reducer;