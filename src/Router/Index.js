import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import DisplayUserDetail from "../Components/DisplayUserDetail";
import Users from "../Components/Users";

function Index() {
    return (
        <Router>
          <Switch>
            <Route exact path="/"  component={Users}/>
            <Route  exact path="/details" component={DisplayUserDetail} />
          </Switch>
        </Router>
    )
}

export default Index
