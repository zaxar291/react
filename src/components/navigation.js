import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/login";
import Registration from "../pages/registration";
import Comments from "../pages/comments";
import {checkIfUserLogged} from "./userActions";
import Logout from "../pages/logout";

export default function Navigation(){
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)

    if (!isLoggedIn) {
        dispatch(checkIfUserLogged())
    }
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Main</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mainNav">
                    <ul className="navbar-nav">
                        {!isLoggedIn && <li className="nav-item">
                            <a className="nav-link" href="/login">Login</a>
                        </li>}
                        {!isLoggedIn &&
                        <li className="nav-item">
                            <a className="nav-link" href="/registration">Registration</a>
                        </li>}
                        <li className="nav-item">
                            <a className="nav-link" href="/comments">Comments</a>
                        </li>
                        {isLoggedIn && <li className="nav-item"><a className="nav-link" href="/logout">Logout</a> </li> }
                        <li></li>
                    </ul>
                </div>
            </nav>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/registration">
                    <Registration />
                </Route>
                <Route path="/comments">
                    <Comments />
                </Route>
                <Route path="/logout">
                    <Logout />
                </Route>
            </Switch>
        </Router>
    )
}
