import React from "react";
import { Route, Switch } from "react-router-dom";
import SearchBooks from "./SearchBooks";
import MyBooks from './MyBooks';
import Home from './Home';
const Routes = () => (
    <Switch>
        <Route
            path="/search"
            component={SearchBooks}
        />
        <Route
            path="/mybooks"
            component={MyBooks}
        />
        <Route
            path="/"
            component={Home}
        />
    </Switch>
    
)