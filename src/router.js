import React from 'react'
import {Switch, Route} from 'react-router-dom'
import MapMaker from './components/MapMaker/MapMaker'
import MapList from './components/MapList/MapList'



export default (
  <Switch>
    <Route exact path='/' component={MapList} />
    <Route path='/map-maker/:id' component={MapMaker} />
  </Switch>
)