import React, { Component } from 'react'
import './MapCard.css'

export default class MapCard extends Component {

  render() {
    return (<div className="card-container">{this.props.mapName}</div>)
  }

}