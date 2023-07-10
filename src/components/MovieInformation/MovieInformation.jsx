import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import genreIcons from '../../assets/genres';
import { userSelector } from '../../features/auth';
import { useGetMovieQuery, useGetRecommendedMoviesQuery, useGetFavoriteOrWatchListQuery } from '../../services/TMDB';
import useStyles from './style';
import { selectGenreOrCategory } from '../../features/currentGenreOrCatetory';
import { MovieList } from '..';

function MovieInformation() {
    // to get the specific id of the movie we use UseParams
    const { id } = useParams();
    const user = useSelector(userSelector);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const { data, isFetching, error } = useGetMovieQuery(id);
    // we give recommendation to data is a placeholder because we've already declared data for another useQuery at the top
    const { data: recommendations, isFetching: isRecommendation } = useGetRecommendedMoviesQuery({ list: '/recommendations', movie_id: id });

    const [isMovieFavorited, setisMovieFavorited] = useState(false);
    const [isMovieWatchList, setisMovieWatchList] = useState(false);

    // The reason we're using axios not redux is b/c redux-toolkit query allows us to fetch data as hooks not directly as queries
    // Like and unlike movie functions
    const baseUrl = 'https://api.themoviedb.org/3';
    const addOrRemoveFavorite = async () => {
        await axios.post(`/${baseUrl}/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, { data: {
            media_type: 'movie',
            media_id: id,
            favorite: !isMovieFavorited,
        } });

        // Getting the previous state(ex: it's favourited, then the !prev toggles it off i.e changes the state)
        setisMovieFavorited((prev) => !prev);
    };

    // Watch and unwatch list movies
    const addOrRemoveWatchList = async () => {
        await axios.post(`/${baseUrl}/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, { data: {
            media_type: 'movie',
            media_id: id,
            watchlist: !isMovieWatchList,
        } });

        setisMovieWatchList((prev) => !prev);
    };

    const { data: favoriteMovies } = useGetFavoriteOrWatchListQuery({
        listName: 'favorite/movies',
        accountId: user.id,
        sessionId: localStorage.getItem('session_id'),
        page: 1,
    });
    const { data: watchListMovies } = useGetFavoriteOrWatchListQuery({
        listName: 'watchlist/movies',
        accountId: user.id,
        sessionId: localStorage.getItem('session_id'),
        page: 1,
    });

    useEffect(() => {
        setisMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
    }, [favoriteMovies, data]);

    useEffect(() => {
        setisMovieWatchList(!!watchListMovies?.results?.find((movie) => movie?.id === data?.id));
    }, [watchListMovies, data]);

    // if the movie information is still loading
    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress size="8rem" />
            </Box>
        );
    }

    // if the movie information is shows an error
    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <Link to="/">Something has gone wrong - Go back </Link>
            </Box>
        );
    }

    return (
        <Grid container className={classes.containerSpaceArea}>

            {/** * Image of the movie */}
            <Grid item sm={12} lg={4} className={classes.resize}>
                <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title} />
            </Grid>

            <Grid item container direction="column" lg={7}>
                {/** date release and tag of the movie  */}
                <Typography variant="h3" align="center" gutterBottom>
                    {data?.title} ({data.release_date.split('-')[0]})
                </Typography>
                <Typography variant="h5" align="center" gutterBottom>
                    {data?.tagline}
                </Typography>

                {/** * rating and languages of the movie */}
                <Grid item className={classes.containerSpaceArea}>
                    <Box display="flex" align="center">
                        <Rating readOnly value={data.vote_average / 2} />
                        <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>
                            {Math.round(data?.vote_average * 10) / 10} / 10
                        </Typography>
                    </Box>
                    <Typography variant="h6" gutterBottom style={{ marginLeft: '10px' }}>
                        {data?.runtime}min | Language: {data?.spoken_languages.length > 0 ? `/ ${data?.spoken_languages[0].name}` : ''}
                    </Typography>
                </Grid>

                {/** * showing the various genre of hte movie */}
                <Grid item className={classes.genresContainer}>
                    {data?.genres.map((genreName, id_movie) => (
                        <Link key={id_movie} className={classes.links} to="/" onClick={() => dispatch(selectGenreOrCategory(genreName.id))}>
                            <img src={genreIcons[genreName?.name.toLowerCase()]} alt="" className={classes.genreImage} height={30} />
                            <Typography variant="subtitle1" color="textPrimary">
                                {genreName?.name}
                            </Typography>
                        </Link>
                    ))}
                </Grid>

                {/** * the movie overview */}
                <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
                    Overview
                </Typography>
                <Typography style={{ marginBottom: '2rem' }}>
                    {data?.overview}
                </Typography>

                {/** * The characters of the movie */}
                <Typography variant="h5" gutterBottom>Top Cast</Typography>
                <Grid item container spacing={2}>
                    {data && data?.credits?.cast?.map((character, i) => (
                        character.profile_path && (
                            <Grid key={i} style={{ textDecoration: 'none' }} item xs={4} md={2} component={Link} to={`/actors/${character.id}`}>
                                <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character?.name} />
                                <Typography color="textPrimary">{character?.name}</Typography>
                                <Typography color="textSecondary">{character?.character.split('/')[0]}</Typography>
                            </Grid>
                        )
                    )).slice(0, 6)}
                </Grid>

                {/** * various buttons of the movie */}
                <Grid item container style={{ marginTop: '2rem' }}>
                    <div className={classes.buttonsContainer}>
                        <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                            <ButtonGroup size="small" variant="outlined">
                                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>
                                    Website
                                </Button>
                                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>
                                    IMDB
                                </Button>
                                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
                            <ButtonGroup size="small" variant="outlined">
                                <Button onClick={addOrRemoveFavorite} href="#" endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                                    {isMovieFavorited ? 'Favourite' : 'Unfavourite'}
                                </Button>
                                <Button onClick={addOrRemoveWatchList} href="#" endIcon={isMovieWatchList ? <Remove /> : <PlusOne />}>
                                    {isMovieWatchList ? 'watchList' : 'watchlist'}
                                </Button>
                                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                                    <Typography style={{ textDecoration: 'none' }} component={Link} to="/" color="inherit" variant="subtitle2">
                                        Back
                                    </Typography>
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </div>
                </Grid>
            </Grid>

            {/** * Movie recommendation */}
            <Box marginTop="5rem" width="100%">
                <Typography variant="h5" gutterBottom align="center">
                    You might also like
                </Typography>
                {/* Loop through the recommended movies */}
                {isRecommendation && (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress size="4rem" />
                    </Box>
                )}
                {!isRecommendation && (
                    recommendations && recommendations?.results?.length
                    // NumberofMovies is a prop we can use to limit the number of recommended movies.
                    // this prop name with be passed inside the Movielist file.
                        ? <MovieList movies={recommendations} numberofMovies={12} />
                        : <Box><Typography variant="h6" align="center">Sorry, we could not find any recommended movie for you</Typography></Box>
                )}
            </Box>

            {/* the trailer of the movie. the modal opens when you click on the trailer button */}
            <Modal
                closeAfterTransition
                className={classes.modal}
                open={open}
                onClose={() => setOpen(false)}
            >
                {data?.videos?.results?.length > 0 && (
                    <iframe
                        autoPlay
                        className={classes.videos}
                        title="Trailer"
                        src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                        allow="autoplay"
                    />
                )}
            </Modal>
        </Grid>
    );
}

export default MovieInformation;
