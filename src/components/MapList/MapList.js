import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MapCard from './MapCard/MapCard'
import './MapList.css'
import {connect} from 'react-redux'

class MapList extends Component {
  constructor() {
    super()
    this.renderMapCards = this.renderMapCards.bind(this)
  }

  renderMapCards() {
    return this.props.maps.map( (map, i) => {
      return <Link className="no-underline" key={i} to={`/map-maker/${i}`}> 
        <MapCard mapName={this.props.maps[i].name} />
      </Link>
    })
  }

  render() {
    return (<div className="flex-container">
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