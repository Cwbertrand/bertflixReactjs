import React, { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ColorModeContext } from '../../utils/ToggleColorMode';
import { selectGenreOrCategory, searchMovie } from '../../features/currentGenreOrCatetory';

import { fetchToken } from '../../utils';

// useAlan won't return anything because it's a custom hook
function useAlan() {
    const { setMode } = useContext(ColorModeContext);
    const history = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        alanBtn({
            key: 'bdb3a07da86710e59f49960a8cda30472e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
                if (command === 'chooseGenre') {
                    const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());
                    if (foundGenre) {
                        history('/');
                        dispatch(selectGenreOrCategory(foundGenre.id));
                    } else {
                        const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;
                        history('/');
                        dispatch(selectGenreOrCategory(category));
                    }
                } else if (command === 'changeMode') {
                    // Call the client code that will react to the received command
                    if (mode === 'light') {
                        setMode('light');
                    } else {
                        setMode('dark');
                    }
                } else if (command === 'login') {
                    fetchToken();
                } else if (command === 'logout') {
                    localStorage.clear();
                    window.location.href = '/';
                } else if (command === 'search') {
                    dispatch(searchMovie(query));
                }
            },
        });
    }, []);
}

export default useAlan;
