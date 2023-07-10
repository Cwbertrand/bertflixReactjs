import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

import { RatedCards } from '..';
import { userSelector } from '../../features/auth';
import { useGetFavoriteOrWatchListQuery } from '../../services/TMDB';

function UserProfile() {
    const { user } = useSelector(userSelector);

    const { data: favoriteMovies, refetch: refetchFavoriteMovies } = useGetFavoriteOrWatchListQuery({
        listName: 'favorite/movies',
        accountId: user.id,
        sessionId: localStorage.getItem('session_id'),
        page: 1,
    });
    const { data: watchListMovies, refetch: refetchWatchListMovies } = useGetFavoriteOrWatchListQuery({
        listName: 'watchlist/movies',
        accountId: user.id,
        sessionId: localStorage.getItem('session_id'),
        page: 1,
    });

    useEffect(() => {
        refetchFavoriteMovies();
        refetchWatchListMovies();
    }, []);

    const logout = () => {
        localStorage.clear();

        // redirect the user after logging out
        window.location.href = '/';
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h4" gutterBottom>My Profile</Typography>
                <Button color="inherit" onClick={logout}>
                    Logout &nbsp; <ExitToApp />
                </Button>
            </Box>
            {!favoriteMovies?.results?.length && !watchListMovies?.results?.length
                ? <Typography variant="h5">Add favorites or watchlist some movies to see them here!</Typography>
                : (
                <Box>
                    <RatedCards title="Favorite Movies" data={favoriteMovies} />
                    <RatedCards title="Watchlist Movies" data={watchListMovies} />
                </Box>
            )}
        </Box>
    );
}

export default UserProfile;
