import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { searchMovie } from '../../features/currentGenreOrCatetory';
import useStyles from './style';

function Search() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [query, setQuery] = useState('');
    const location = useLocation();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            dispatch(searchMovie(query));
        }
    };

    // Don't show the search bar when the user isn't in the homepage
    if (location.pathname !== '/') return null;
    return (
        <div className={classes.searchContainer}>
            <TextField
                onKeyPress={handleKeyPress}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant="standard"
                InputProps={{
                    className: classes.input,
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}
export default Search;
