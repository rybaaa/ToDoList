import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider} from "@material-ui/core";
import {createTheme} from '@material-ui/core/styles';
import {blue, green, purple, red} from "@material-ui/core/colors";
import {Provider} from "react-redux";
import {store} from "./store/store";
import AppWithRedux from "./AppWithRedux";

const theme = createTheme({
        palette: {
            primary: blue,
            secondary: purple,
        },
    }
)
ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <AppWithRedux/>
        </Provider>

    </ThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
