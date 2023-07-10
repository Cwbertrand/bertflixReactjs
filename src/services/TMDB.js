import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
    // All createApi methods needs to have a reducerPath
    // The path will be a string
    reducerPath: 'tmdbApi',

    // a fetchbasequery is to fetch the object of the api url
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) => ({
        // Get movies by [type like genre, popular, etc]

        //* Genres
        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
        }),

        //* Get all popular movies
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {
                //* Getting movies by search
                if (searchQuery) {
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
                }
                //* Getting movies by categories in string
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }

                //* Gettomg movies by genres(filter) in number
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                }

                // getting all popular movies
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            },
        }),

        //* Getting list of liked or watched movies
        getFavoriteOrWatchList: builder.query({
            // putting movies inside paranthensis means it's an object
            query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
        }),

        //* new endpoint to get the details of a particular movie
        getMovie: builder.query({
        query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
        }),

        //* Getting list of recommended movies of a particular movie clicked upon
        getRecommendedMovies: builder.query({
            // putting movies inside paranthensis means it's an object
            query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
        }),

        //* Getting the actor's details
        getActorId: builder.query({
            // putting movies inside paranthensis means it's an object
            query: (actor_id) => `/person/${actor_id}?api_key=${tmdbApiKey}`,
        }),

        //* Getting the movies the actor starred in
        getActorStarredIn: builder.query({
            // putting movies inside paranthensis means it's an object
            query: (actor_id, page) => `/discover/movie?with_cast=${actor_id}&page=${page}&api_key=${tmdbApiKey}`,
        }),
    }),

});

// When you create an api fetch Redux automatically creates a hook
export const {
    useGetMoviesQuery,
    useGetGenresQuery,
    useGetMovieQuery,
    useGetRecommendedMoviesQuery,
    useGetActorIdQuery,
    useGetActorStarredInQuery,
    useGetFavoriteOrWatchListQuery,
} = tmdbApi;
