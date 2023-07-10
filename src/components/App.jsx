import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import { Root, Toolbar, Content } from './style';
import { ActorInformation, MovieInformation, Movies, UserProfile, NavBar } from '.';
import useAlan from './Alan/Alan';

function App() {
    // this is how you import and call a hook
    useAlan();

    const AlanBtnContainer = useRef();
    return (
        <Root>
            <CssBaseline />
            <NavBar />
            <Content>
                <Toolbar />
                <Routes>  { /* a <Routes> looks through its children <Route>s and renders the first one that matches the current URL */ }
                    <Route exact path="/" element={<Movies />} />
                    <Route exact path="/approved" element={<Movies />} />
                    <Route exact path="/Movie/:id" element={<MovieInformation />} />
                    <Route exact path="/actors/:id" element={<ActorInformation />} />
                    <Route exact path="/profile/:id/" element={<UserProfile />} />
                </Routes>
            </Content>
            <div ref={AlanBtnContainer} />
        </Root>
    );
}

export default App;
