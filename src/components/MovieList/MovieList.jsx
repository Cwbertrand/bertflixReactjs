import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './style';
import { Movie } from '..';

function MovieList({ movies, numberofMovies, excludeFirst }) {
    const classes = useStyles();
    const startFromOne = excludeFirst ? 1 : 0;
    return (
        <Grid container className={classes.moviesContainer}>
            {movies.results.slice(startFromOne, numberofMovies).map((movie, i) => (
                // Rendering each movie component with unique key and props
                <Movie key={i} movie={movie} i={i} />
            ))}
        </Grid>
    );
}

export default MovieList;
