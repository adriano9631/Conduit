import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
	box-sizing: border-box;
	font-family: "Segoe UI", "Roboto", sans-serif, BlinkMacSystemFont, "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
		"Droid Sans", "Helvetica Neue";
}

html {
	font-size: 62.5%;
}

body {
	margin: 0;
	padding: 0;
    background-color: #fcfafa;
	color: '#061539';
	font-size: 1.6rem;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
`;
