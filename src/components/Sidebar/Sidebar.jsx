import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { selectGenreOrCategory } from '../../features/currentGenreOrCatetory';
import useStyles from './style';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';

import lightLogo from '../../assets/images/lightLogo.png';
import darkLogo from '../../assets/images/darkLogo.png';

// filter movies
const filter = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming Releases', value: 'upcoming' },
];

function Sidebar({ setMobileOpen }) {
    const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCatetory);
    const theme = useTheme();
    const classes = useStyles();

    //* this is a state
    const { data, isFetching } = useGetGenresQuery();

    // closing the sidebar for mobile version when a filter or category is selected
    useEffect(() => {
        setMobileOpen(false);
    }, [genreIdOrCategoryName]);

    const dispatch = useDispatch();
    return (
        <>
            <Link to="/" className={classes.imageLink}> { /* site logo */ }
                <img
                    className={classes.image}
                    src={theme.palette.mode === 'light' ? lightLogo : darkLogo}
                    alt="Filmpire Site Logo"
                />
            </Link>
            <Divider />

            {/* Creating the list of links to appear in the sidebar */}
            <List>
                <ListSubheader>Filters</ListSubheader>
                {filter.map(({ label, value }) => (
                    <Link key={value} className={classes.links} to="/">
                        <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
                            <ListItemIcon>
                                <img src={genreIcons[label.toLowerCase()]} className={classes.genreImages} height={30} />
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                <ListSubheader>Filters</ListSubheader>
                {isFetching ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                ) : data.genres.map(({ name, id }) => (
                    <Link key={name} className={classes.links} to="/">
                        <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
                            <ListItemIcon>
                                <img src={genreIcons[name.toLowerCase()]} className={classes.genreImages} height={30} />
                            </ListItemIcon>
                            <ListItemText primary={name} />
                        </ListItem>
                    </Link>
                ))}
            </List>

        </>
    );
}

export default Sidebar;
