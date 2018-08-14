import React, { Component } from 'react';
import { BrowserRouter,Switch, Route } from 'react-router-dom'

import { Root } from './pages'


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Root} />
            </Switch>
        </BrowserRouter>
    )
}


export {Routes}
