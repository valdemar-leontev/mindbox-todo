import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../slices/tasksSlice'
import filterSlice from '../slices/filtersSlice';

export default configureStore({
    reducer: {
        tasks: tasksReducer,
        filter: filterSlice
    },
})