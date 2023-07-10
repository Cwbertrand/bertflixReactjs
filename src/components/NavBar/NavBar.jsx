import React, { useEffect, useState, useContext } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, Brightness4, Brightness7, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import { setUser, userSelector } from '../../features/auth';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import { Sidebar, Search } from '..';
import useStyles from './style';
import { ColorModeContext } from '../../utils/ToggleColorMode';

function NavBar() {
    const classes = useStyles();
    const isMobile = useMediaQuery('(max-width:600px)'); // if width > 600px => isMobile == false
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    // a hook

    const dispatch = useDispatch();
    const [mobileOpen, setMobileOpen] = useState(false);

    // selecting out only the user information when connected
    const { isAuthenticated, user } = useSelector(userSelector);

    // token from local storage
    const token = localStorage.getItem('request_token');

    // we want the user to be signed in and authenticated when the user clicks on "Approved"
    // so we'll use the useEffect from react
    // it's going to have a callback function and a dependency array [token]

    useEffect(() => {
        const logInUser = async () => {
            if (token) {
                try {
                     // in the case we don't have the session id but we already have the toke,
                    // we have to create a new session id for the user
                    const sessionId = localStorage.getItem('session_id') ? localStorage.getItem('session_id') : await createSessionId();

                    // getting the user data and destructuring it
                    const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);

                    // dispatching the user's data to redux store
                    dispatch(setUser(userData));
                } catch (error) {
                    console.log('Your user data could not be fetched.');
                }
            }
        };
        logInUser();
    }, [token]);

    return (
        <>
            <AppBar className={classes.changeColor} position="fixed">
                <Toolbar className={classes.toolbar}>
                    {isMobile && (
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            edge="start"
                            style={{ outline: 'none' }}
                            onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                            // this is where you open the callback function for the sidebar to toggle
                            // this statement says setMobileOpen to a different state than it usually was
                            // (the different state is toggling at any moment it is clicked)
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <IconButton color="inherit" sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                    {!isMobile && <Search />}
                    <div>
                        {!isAuthenticated ? (
                            <Button color="inherit" onClick={fetchToken}>
                                Login &nbsp; <AccountCircle />
                            </Button>
                        ) : (
                            <Button onClick={() => {}} color="inherit" component={Link} to={`/profile/${user.id}`}>
                                {!isMobile && <>My movies &nbsp;</>}
                                <Avatar
                                    style={{ width: 30, height: 30 }}
                                    alt="profile"
                                    src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avater_path}`}
                                />
                            </Button>
                        )}
                    </div>
                    {isMobile && <Search />}
                </Toolbar>
            </AppBar>

            {/* for sidebar */}
            <div>
                <nav className={classes.drawer}> { /* HTML5 div with navigation abilities */ }
                    {isMobile ? (
                        <Drawer
                            variant="temporary" // toggleable
                            anchor="right"
                            open={mobileOpen} // by default mobileOpen == false
                            onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)} // Makikg a call back function that calls the state prevMobileOpen
                            classes={{ paper: classes.drawerPaper }} // a way to override the underlying styles of the mui component
                            ModalProps={{ keepMounted: true }}
                        >
                        <Sidebar setMobileOpen={setMobileOpen} /> { /* a new component */ }
                        </Drawer>

                    ) : (
                        <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
                            <Sidebar setMobileOpen={setMobileOpen} /> { /* a new component */ }
                        </Drawer>
                    )}
                </nav>
            </div>
        </>
    );
}

export default NavBar;
