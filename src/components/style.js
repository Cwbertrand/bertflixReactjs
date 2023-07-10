import { styled } from '@mui/system';

export const Root = styled('div')({
    display: 'flex',
    height: '100%',
});

export const Toolbar = styled('div')({
    height: '70px',
});

export const Content = styled('main')({
    flexGrow: 1,
    padding: '2em',
    width: '100%',
});
