import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB';

import genreOrCategoryReducer from '../features/currentGenreOrCatetory';
import userReducer from '../features/auth';

export default configureStore({
    reducer: {
        // have to pass an object of the reducerPath in the TMDB file
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCatetory: genreOrCategoryReducer,
        currentUser: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});
