import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider} from "@material-ui/core";
import {createTheme} from '@material-ui/core/styles';
import {blue, purple} from "@material-ui/core/colors";
import {Provider} from "react-redux";
import {store} from "./store/store";
import AppWithRedux from "./AppWithRedux";
import {createRoot} from 'react-dom/client'


const theme = createTheme({
        palette: {
            primary: blue,
            secondary: purple,
        },
    }
)
const container = document.getElementById('root')
const root = createRoot(container as Element)
root.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <AppWithRedux/>
        </Provider>
    </ThemeProvider>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
