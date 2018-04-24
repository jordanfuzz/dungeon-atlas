import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MapCard from './MapCard/MapCard'
import './MapList.css'
import {connect} from 'react-redux'
import { request } from 'graphql-request'

const query = `{
  user(id:1) {
    maps {
      mapName
      areas {
        area
      }
    }
  }
}`

const mutation = `mutation AddNewArea($input: AreaInput!) {
  AddArea(input:$input) {
    mapId
    subMap
    area
  }
}`
const object = { shape: "poly", coords: [25, 33, 27, 300, 128, 240, 128, 94] }
const variables = {
  input: {
    "mapId":2,
    "subMap":3,
    "area": JSON.stringify(object)
  }
}

class MapList extends Component {
  constructor() {
    super()
    this.renderMapCards = this.renderMapCards.bind(this)
    this.handleGetData = this.handleGetData.bind(this)
  }

  renderMapCards() {
    return this.props.maps.map( (map, i) => {
      return <Link className="no-underline" key={i} to={`/map-maker/${i}`}> 
        <MapCard mapName={this.props.maps[i].name} />
      </Link>
    })
  }

  handleGetData() {
    request('http://localhost:3002/graphql', query, variables).then(data => console.log(data))
  }

  render() {
    return (<div className="flex-container">
        {this.renderMapCards()}
        <button onClick={this.handleGetData}>Get Data</button>
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    maps: state.maps
  }
}

export default connect(mapStateToProps)(MapList)