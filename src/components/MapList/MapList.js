import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MapCard from './MapCard/MapCard'
import './MapList.css'
import {connect} from 'react-redux'
import { request, GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('http://localhost:3002/graphql', {
 mode: 'cors'
})

const query = `{
  user(id:1) {
    userId
    email
  }
}`

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
    client.request(query).then(data => console.log(data))
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