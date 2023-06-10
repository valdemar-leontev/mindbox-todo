import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        currentFilter: 'All'
    },
    reducers: {
        changeFilter: (state, filter: string | any) => {
            state.currentFilter = filter.payload;
        }
    }
});


export const { changeFilter } = filterSlice.actions;

export default filterSlice.reducer;