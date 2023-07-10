import React, { useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList, Pagination, FeaturedMovies } from '..';

function Movies() {
    const [page, setPage] = useState(1);
    const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCatetory);
    // getting the data from the api query
    const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
    const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

    const numberOfMovies = lg ? 17 : 19;

    // if we are fecthing the data, do this
    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
            </Box>
        );
    }

    // if after you fetch data from the api, but no result comes out
    if (!data.results.length) {
        return (
            <Box display="flex" alignItem="center" mt="20px">
                <Typography variant="h4">No movies that match that name</Typography>
            </Box>
        );
    }

    if (error) return 'An error has occurred';

    return (
        // here we render a movie component
        <div>
            <FeaturedMovies movie={data} />
            <MovieList movies={data} numberofMovies={numberOfMovies} excludeFirst />
            <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
        </div>
    );
}

export default Movies;
