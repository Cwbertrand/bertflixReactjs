import axios from 'axios';

// creating an instance of the axios call

export const moviesApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: process.env.REACT_APP_TMDB_KEY,
    },
});

export const fetchToken = async () => {
    try {
        // making a request to get a new token
        const { data } = await moviesApi.get('/authentication/token/new');

        // collecting the token
        const token = data.request_token;

        // if we finally collect the data
        if (data.success) {
            // putting the token in the local storage
            localStorage.setItem('request_token', data.request_token);

            // redirecting the user to a page where to authenticate the token
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
        }
    } catch (error) {
        console.log('Sorry, you couldn\'t connect');
    }
};

export const createSessionId = async () => {
    const token = localStorage.getItem('request_token');

    if (token) {
        try {
            // putting {data} like this means destructuring
            const { data: { session_id } } = await moviesApi.post('authentication/session/new', {
                request_token: token,
            });

            // updating the localstorage
            localStorage.setItem('session_id', session_id);

            // returning the session id of the user
            return session_id;
        } catch (error) {
            console.log(error);
        }
    }
};
