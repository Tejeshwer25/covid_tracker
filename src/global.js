import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *, 
    *::after, 
    *::before {
        box-sizing
    }

    body {
        background: ${({theme}) => theme.body};
        color: ${({ theme}) => theme.text};
        transition: all 0.25s linear;
    }

    .map {
        background: ${({theme}) => theme.card};
        color: ${({theme}) => theme.text};
    }

    .information {
        background: ${({theme}) => theme.card};
        color: ${({theme}) => theme.text};
    }

    .app__right--card {
        background: ${({theme}) => theme.card};
        color: ${({theme}) => theme.text};
    }

    .table tr:nth-of-type(odd) {
        color: ${({theme}) => theme.tabletext};
    }

    .information__title, .information__total {
        color: ${({theme}) => theme.text};
    }
`