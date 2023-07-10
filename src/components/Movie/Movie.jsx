import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './style';

function Movie({ movie, i }) {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
            {/* Grow is an animation property of mui */}
            {/* <Grow in key={i} timeout={(i + 1) * 250}> </Grow>  this means each set of film will be animated sequentially like 100, 200, 300, etc */}

            <Link className={classes.links} to={`/movie/${movie.id}`}>
                {/* {movie.poster_path // when you find {} within codes like this, know it's a dynamic block of code
                ? <img alt={movie.title} className={classes.image} src={`https://image.tmdb.org/t/p.w500/${movie.poster_path}`} />
                : <img alt={movie.title} className={classes.image} src="https://www.fillmurray.com/200/300" />} */}

                {/* to avoid dubplication of codes, we can also do this */}

                <img
                    alt={movie.title}
                    className={classes.image}
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : 'https://www.fillmurray.com/200/300'}
                />
                <Typography className={classes.title} variant="h5">{movie.title}</Typography>
                <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
                    <div>
                        <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
                    </div>
                </Tooltip>
            </Link>
        </Grid>
    );
}

export default Movie;
