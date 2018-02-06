import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MapCard from './MapCard/MapCard'
import './MapList.css'
import {connect} from 'react-redux'

class MapList extends Component {
  constructor() {
    super()
    this.state = {

    }
    this.renderMapCards = this.renderMapCards.bind(this)
  }


  //should redirect user to a specific map, not just a default one
  //should use /map-maker/:map


  renderMapCards() {
    return this.props.maps.map( (map, i) => {
      return <Link  key={i} to={`/map-maker/${i}`}> 
        <MapCard />
      </Link>
    })
  }

  render() {

    return (<div>
        {this.renderMapCards()}
    </div>)
  }

}

function mapStateToProps(state) {
  return {
    maps: state.maps
  }
}


export default connect(mapStateToProps)(MapList)