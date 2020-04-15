import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from './Footer';
import Admin from '../screens/Admin';
import Home from '../screens/Home';

export default function AppRouter(){
    return(
        <Router>
            <Header></Header>
            <Navbar/>
            <Switch>
                <Route path="/admin">
                    <Admin></Admin>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
            <Footer></Footer>
        </Router>
    )
}