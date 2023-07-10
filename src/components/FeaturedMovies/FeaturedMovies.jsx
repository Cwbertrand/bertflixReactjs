import React from 'react';
import { Typography, Box, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './style';

function FeaturedMovies({ movie }) {
    const classes = useStyles();

    if (!movie) return null;

    return (
        <Box component={Link} to={`/movie/${movie?.results[0]?.id}`} className={classes.featureCardContainer}>
            <Card className={classes.card} classes={{ root: classes.cardRoot }}>
                <CardMedia
                    media="picture"
                    alt={movie?.results[0]?.title}
                    image={`https://image.tmdb.org/t/p/original/${movie?.results[0]?.backdrop_path}`}
                    className={classes.cardMedia}
                    title={movie?.results[0]?.title}
                />
                <Box padding="20px">
                    <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
                        <Typography variant="h5" gutterBottom>{movie?.results[0]?.title}</Typography>
                        <Typography variant="body2">{movie?.results[0]?.overview}</Typography>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    );
}

export default FeaturedMovies;
