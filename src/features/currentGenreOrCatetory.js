import { createSlice } from '@reduxjs/toolkit';

export const genreOrCategory = createSlice({
    name: 'genreOrCategory',
    initialState: {
        genreIdOrCategoryName: '',
        page: 1,
        searchQuery: '',
    },
    // we manually create the reducers here
    reducers: {
        selectGenreOrCategory: (state, action) => {
            // mutating the original state and overriding it at thesame time
            state.genreIdOrCategoryName = action.payload;
            // anytime we search for a category or genre we have to reset our payload
            state.searchQuery = '';
        },
        searchMovie: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;

export default genreOrCategory.reducer;
// when ever we have a reducer we have to attach it to the store folder
