import { Service } from "@/interfaces/common";
import { createSlice } from "@reduxjs/toolkit";

interface IFilter {
    name: string | null;
    searchTerm: string | null;
}

interface IState {
    allBooks: Service[];
    filterOptions: IFilter;
}

const initialState: IState = {
    allBooks: [],
    filterOptions: {
        name: null,
        searchTerm: null,
    },
};

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        getAllBooks: (state, action) => {
            state.allBooks = action.payload;
        },
        filterOptions: (state, action) => {
            const { name, searchTerm } = action.payload;
            state.filterOptions.name = name;
            state.filterOptions.searchTerm = searchTerm;
        },
    },
});

export const {
    getAllBooks,
    filterOptions,
} = serviceSlice.actions;
export default serviceSlice.reducer;
