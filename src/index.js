import React from 'react';
import {render} from 'react-dom';
import {compose, createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navigation from "./components/navigation";
import {rootReducer} from "./reducers/root";

const store = createStore(rootReducer, compose(
    applyMiddleware(
        thunk
    )
))

render(
    <Provider store={store}>
        <Navigation />
    </Provider>,
    document.getElementById("navigation")
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
