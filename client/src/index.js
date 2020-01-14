import store from "./redux/reduxState"
import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppConteiner from "./AppContainer";

    ReactDOM.render(
        <BrowserRouter>
            <Provider store = {store}>
                <AppConteiner state={store.getState()} />
            </Provider>
        </BrowserRouter>
        ,document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
