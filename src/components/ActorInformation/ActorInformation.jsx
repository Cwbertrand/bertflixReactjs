import React, { useState } from 'react';
import { Typography, Button, ButtonGroup, Grid, Box, CircularProgress } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

import { useGetActorIdQuery, useGetActorStarredInQuery } from '../../services/TMDB';
import useStyles from './style';
import { MovieList, Pagination } from '..';

function ActorInformation() {
    const { id } = useParams();
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const { data, isFetching, error } = useGetActorIdQuery(id);
    const { data: actorStarredMovies } = useGetActorStarredInQuery({ id, page });
    console.log(actorStarredMovies);

    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress size="8rem" />
            </Box>
        );
    }
    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <Link to="/">Something has gone wrong - Go back </Link>
            </Box>
        );
    }

    return (

        <Grid container className={classes.containerSpaceArea}>
            {/** * Image of the actor */}
            <Grid item sm={12} lg={4}>
                <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`} alt={data?.name} />
            </Grid>

            <Grid item container direction="column" lg={7}>
                {/** showing the name and date of birth of the actor and biography */}
                <Typography variant="h2" align="left" gutterBottom>
                    {data?.name}
                </Typography>
                <Typography variant="h5" align="left" gutterBottom>
                    Born: {new Date(data?.birthday).toDateString()}
                </Typography>
                <Typography style={{ marginBottom: '2rem' }} align="justify">
                    {data?.biography}
                </Typography>

                {/** * various buttons of the movie */}
                <Grid item container style={{ marginTop: '2rem' }}>
                    <div className={classes.buttonsContainer}>
                        <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                            <ButtonGroup size="small" variant="contained">
                                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/name/${data?.imdb_id}`}>
                                    IMDB
                                </Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                            <ButtonGroup size="small" variant="none">
                                <Button startIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }} color="primary">
                                    <Typography style={{ textDecoration: 'none' }} component={Link} to="/" color="primary" variant="subtitle2">
                                        Back
                                    </Typography>
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </div>
                </Grid>
            </Grid>

            {/** * Movie recommendation */}
            <Box margin="3rem 0" width="100%">
                <Typography variant="h5" gutterBottom align="center">
                    Movies
                </Typography>
                {/* Loop through the recommended movies */}
                {actorStarredMovies && <MovieList movies={actorStarredMovies} numberofMovies={12} />}
                <Pagination currentPage={page} setPage={setPage} totalPages={actorStarredMovies?.total_pages} />
            </Box>
        </Grid>
    );
}

export default ActorInformation;
