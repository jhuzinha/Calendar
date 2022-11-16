import { createGlobalStyle, keyframes } from 'styled-components';

export const backgroundAnimation = keyframes`
 0% { background-position: 0% 50% }
 50% { background-position: 80% 50%  }
 100% { background-position: 0% 50%  }
`


export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
    }

    html, body, #root {
       width: 100%;
    }

    *, button, input {
        border: 0;
        outline: 0;
        color: black;
    }
`

